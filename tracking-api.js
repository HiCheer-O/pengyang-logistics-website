const TRACKING_STATUS = {
  WAREHOUSE: "WAREHOUSE",
  IN_TRANSIT: "IN_TRANSIT",
  CUSTOMS: "CUSTOMS",
  DELIVERY: "DELIVERY",
  SIGNED: "SIGNED",
  EXCEPTION: "EXCEPTION",
  NOT_FOUND: "NOT_FOUND",
};

const TRACKING_STATUS_TONE = {
  [TRACKING_STATUS.WAREHOUSE]: "warehouse",
  [TRACKING_STATUS.IN_TRANSIT]: "international",
  [TRACKING_STATUS.CUSTOMS]: "customs",
  [TRACKING_STATUS.DELIVERY]: "delivery",
  [TRACKING_STATUS.SIGNED]: "signed",
  [TRACKING_STATUS.EXCEPTION]: "exception",
  [TRACKING_STATUS.NOT_FOUND]: "missing",
};

const TRACKING_STATUS_I18N_KEY = {
  [TRACKING_STATUS.WAREHOUSE]: "tracking.statusWarehouse",
  [TRACKING_STATUS.IN_TRANSIT]: "tracking.statusInternational",
  [TRACKING_STATUS.CUSTOMS]: "tracking.statusCustoms",
  [TRACKING_STATUS.DELIVERY]: "tracking.statusDelivery",
  [TRACKING_STATUS.SIGNED]: "tracking.statusSigned",
  [TRACKING_STATUS.EXCEPTION]: "tracking.statusException",
  [TRACKING_STATUS.NOT_FOUND]: "tracking.notFoundStatus",
};

const trackingQueryCache = new Map();
let lastTrackingQueryTime = 0;
let activeTrackingRequestController = null;

function normalizeTrackingNumbers(numbers) {
  return numbers.map((number) => number.trim()).filter(Boolean).slice(0, 30);
}

function getTrackingCacheKey(numbers) {
  return normalizeTrackingNumbers(numbers).map((number) => number.toUpperCase()).sort().join("|");
}

function getMockStatus(number, index) {
  const normalized = number.toUpperCase();

  if (/(?:NO|NOTFOUND|UNKNOWN)/i.test(number) || /404$/i.test(number)) {
    return TRACKING_STATUS.NOT_FOUND;
  }

  const scenarioMap = [
    ["WH", TRACKING_STATUS.WAREHOUSE],
    ["IN", TRACKING_STATUS.IN_TRANSIT],
    ["CU", TRACKING_STATUS.CUSTOMS],
    ["DL", TRACKING_STATUS.DELIVERY],
    ["SG", TRACKING_STATUS.SIGNED],
    ["EX", TRACKING_STATUS.EXCEPTION],
  ];
  const matched = scenarioMap.find(([code]) => normalized.includes(`-${code}`) || normalized.endsWith(code));

  return matched ? matched[1] : [
    TRACKING_STATUS.WAREHOUSE,
    TRACKING_STATUS.IN_TRANSIT,
    TRACKING_STATUS.CUSTOMS,
    TRACKING_STATUS.DELIVERY,
    TRACKING_STATUS.SIGNED,
  ][index % 5];
}

function buildMockTrackingRecord(number, index) {
  const status = getMockStatus(number, index);
  const statusTone = TRACKING_STATUS_TONE[status];
  const isNotFound = status === TRACKING_STATUS.NOT_FOUND;
  const stepCountMap = {
    [TRACKING_STATUS.WAREHOUSE]: 2,
    [TRACKING_STATUS.IN_TRANSIT]: 3,
    [TRACKING_STATUS.CUSTOMS]: 5,
    [TRACKING_STATUS.DELIVERY]: 6,
    [TRACKING_STATUS.SIGNED]: 7,
    [TRACKING_STATUS.EXCEPTION]: 4,
    [TRACKING_STATUS.NOT_FOUND]: 0,
  };
  const elapsedDays = status === TRACKING_STATUS.SIGNED ? 5 + (index % 3) : status === TRACKING_STATUS.WAREHOUSE ? 1 : 3 + (index % 4);
  const dayOffset = index % 3;
  const clocks = ["09:18", "16:42", "23:10", "10:35", "15:20", "09:30", "17:45"];
  const nodes = Array.from({ length: stepCountMap[status] }, (_, stepIndex) => ({
    code: `STEP_${stepIndex + 1}`,
    time: `2026-05-${String(17 + dayOffset + Math.min(stepIndex, 3)).padStart(2, "0")} ${clocks[stepIndex]}`,
    titleKey: `tracking.step${stepIndex + 1}Title`,
    detailKey: `tracking.step${stepIndex + 1}Detail`,
  }));

  if (status === TRACKING_STATUS.EXCEPTION) {
    nodes.push({
      code: "EXCEPTION",
      time: `2026-05-${String(20 + (index % 2)).padStart(2, "0")} 14:05`,
      titleKey: "tracking.exceptionTitle",
      detailKey: "tracking.exceptionDetail",
    });
  }

  return {
    trackingNo: number,
    status,
    statusTone,
    statusKey: TRACKING_STATUS_I18N_KEY[status],
    customerName: isNotFound ? "-" : { key: "tracking.customerValue", suffix: String(index + 1).padStart(2, "0") },
    routeVariant: index % 3,
    elapsedDays: isNotFound ? 0 : elapsedDays,
    nodes,
  };
}

async function requestTrackingRecords(numbers, options = {}) {
  const normalizedNumbers = normalizeTrackingNumbers(numbers);

  // Replace this mock with fetch('/api/tracking/batch', ...) when the Java API is ready.
  await new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, 320);

    options.signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Query cancelled", "AbortError"));
    });
  });

  return normalizedNumbers.map(buildMockTrackingRecord);
}

async function queryTrackingRecords(numbers) {
  const normalizedNumbers = normalizeTrackingNumbers(numbers);
  const cacheKey = getTrackingCacheKey(normalizedNumbers);
  const now = Date.now();
  const cached = trackingQueryCache.get(cacheKey);

  if (cached && now - cached.time < 60000) {
    return {
      data: cached.data,
      fromCache: true,
      throttled: false,
    };
  }

  if (now - lastTrackingQueryTime < 2000) {
    return {
      data: cached?.data || null,
      fromCache: Boolean(cached),
      throttled: true,
    };
  }

  lastTrackingQueryTime = now;

  if (activeTrackingRequestController) {
    activeTrackingRequestController.abort();
  }

  activeTrackingRequestController = new AbortController();

  try {
    const data = await requestTrackingRecords(normalizedNumbers, {
      signal: activeTrackingRequestController.signal,
    });
    trackingQueryCache.set(cacheKey, {
      time: Date.now(),
      data,
    });

    return {
      data,
      fromCache: false,
      throttled: false,
    };
  } finally {
    activeTrackingRequestController = null;
  }
}
