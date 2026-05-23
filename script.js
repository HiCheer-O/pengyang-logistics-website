const form = document.querySelector("#trackingForm");
const input = document.querySelector("#trackingNumber");
const result = document.querySelector("#trackingResult");
const shipmentList = document.querySelector("#shipmentList");
const shipmentDetail = document.querySelector("#shipmentDetail");
const trackingCount = document.querySelector("#trackingCount");
const queryButton = form?.querySelector("button[type='submit']");
const languageButtons = document.querySelectorAll(".language-option");
const navLinks = document.querySelectorAll(".nav-link");
const observedSections = document.querySelectorAll("#about, #services, #tracking, #contact");
const currentPage = document.body.dataset.page || "home";

const translations = {
  zh: {
    "meta.description": "广州澎洋国际货运代理有限公司官网，提供国际海运、空运、报关清关、仓储配送及物流查询展示。",
    "company.name": "广州澎洋国际货运代理有限公司",
    "brand.aria": "广州澎洋国际货运代理有限公司首页",
    "brand.logoAlt": "广州澎洋国际货运代理有限公司 Logo",
    "nav.aria": "主导航",
    "nav.about": "公司简介",
    "nav.services": "服务范围",
    "nav.tracking": "物流查询",
    "nav.contact": "联系我们",
    "language.aria": "语言切换",
    "hero.eyebrow": "International Freight Forwarding",
    "hero.title": "连接全球航线，护航每一次跨境交付",
    "hero.copy": "广州澎洋国际货运代理有限公司专注国际货运代理服务，为客户提供海运、空运、报关、仓储及门到门物流等一站式解决方案。",
    "hero.primaryCta": "查询物流",
    "hero.secondaryCta": "查看服务",
    "hero.panelAria": "业务概览",
    "hero.panelTitle": "Global Logistics",
    "hero.panelText": "海运 / 空运 / 清关 / 仓配",
    "about.eyebrow": "About Pengyang",
    "about.title": "专业、稳健、高效的国际物流伙伴",
    "about.cardTitle": "公司简介",
    "about.p1": "广州澎洋国际货运代理有限公司立足广州，面向全球市场，致力于为外贸企业、跨境电商及供应链客户提供可视化、标准化、可落地的国际物流服务。",
    "about.p2": "以下内容为占位简介，可在后续替换为真实成立时间、航线资源、合作网络、团队规模及资质信息。",
    "about.metricsAria": "服务优势",
    "metrics.globalTitle": "全球",
    "metrics.globalText": "航线资源",
    "metrics.solutionTitle": "一站式",
    "metrics.solutionText": "物流方案",
    "metrics.trackingTitle": "全流程",
    "metrics.trackingText": "节点跟踪",
    "services.eyebrow": "Services",
    "services.title": "覆盖跨境运输全链路",
    "services.seaTitle": "国际海运",
    "services.seaText": "整柜、拼箱、港到港及门到门方案，适配大宗货物与常规外贸运输需求。",
    "services.airTitle": "国际空运",
    "services.airText": "面向高时效货物提供灵活空运服务，支持紧急补货、样品及高价值货品运输。",
    "services.customsTitle": "报关清关",
    "services.customsText": "协助客户处理报关、清关、单证及合规流程，降低跨境交付不确定性。",
    "services.doorTitle": "门到门物流",
    "services.doorText": "整合拖车、仓储、干线运输与目的港派送，提供端到端的物流执行方案。",
    "tracking.eyebrow": "Tracking",
    "tracking.title": "物流查询",
    "tracking.copy": "当前为前端演示版本，可批量输入多个运单号查看模拟物流节点。后续接入真实接口时，可保留这一套界面结构。",
    "tracking.label": "运单号 / 提单号 / 柜号",
    "tracking.placeholder": "例如：PY-WH-001\nPY-IN-002",
    "tracking.tip": "支持换行、空格或逗号分隔，单次最多查询 30 个单号。",
    "tracking.button": "查询",
    "tracking.loading": "查询中...",
    "tracking.emptyTitle": "等待查询",
    "tracking.emptyText": "请输入一个或多个单号后查看物流进度",
    "tracking.resultNote": "模拟查询结果，仅用于前端界面展示",
    "tracking.batchNote": "已为 {count} 个单号生成模拟查询结果。",
    "tracking.limitNote": "单次最多支持 30 个单号，已优先展示前 30 个。",
    "tracking.workspaceAria": "物流查询工作台",
    "tracking.listTitle": "查询单号",
    "tracking.detailEmptyTitle": "选择左侧单号查看详情",
    "tracking.detailEmptyText": "右侧将展示国际运输、客户名称、目的地和轨迹节点等信息。",
    "tracking.detailTitle": "轨迹详情",
    "tracking.customer": "客户名称",
    "tracking.route": "国际线路",
    "tracking.origin": "起运地",
    "tracking.destination": "目的地",
    "tracking.serviceType": "服务类型",
    "tracking.eta": "预计到达",
    "tracking.elapsedDays": "当前时效",
    "tracking.elapsedDaysValue": "已运输 {days} 天",
    "tracking.latest": "最新节点",
    "tracking.customerValue": "示例客户",
    "tracking.routeValue": "中国广州 - 马来西亚吉隆坡",
    "tracking.originValue": "广州仓",
    "tracking.destinationValue": "吉隆坡",
    "tracking.serviceTypeValue": "国际空运 + 清关派送",
    "tracking.etaValue": "3-5 个工作日",
    "tracking.status": "运输中",
    "tracking.statusWarehouse": "已入仓",
    "tracking.statusInternational": "国际运输中",
    "tracking.statusCustoms": "清关中",
    "tracking.statusDelivery": "派送中",
    "tracking.statusSigned": "已签收",
    "tracking.statusException": "异常件",
    "tracking.notFoundStatus": "未查询到",
    "tracking.notFoundTitle": "暂未查询到物流信息",
    "tracking.notFoundText": "请核对单号是否正确，或稍后再试。若刚刚创建运单，轨迹可能需要一段时间同步。",
    "tracking.step1Title": "订单已受理",
    "tracking.step1Detail": "澎洋国际已接收委托，正在核对订舱及单证信息。",
    "tracking.step2Title": "货物已入仓",
    "tracking.step2Detail": "货物完成入仓扫描，等待安排干线运输。",
    "tracking.step3Title": "国际运输中",
    "tracking.step3Detail": "货物已进入国际运输环节，预计后续更新清关节点。",
    "tracking.step4Title": "目的港处理中",
    "tracking.step4Detail": "目的港代理正在处理到港、清关及后续派送安排。",
    "tracking.step5Title": "清关处理中",
    "tracking.step5Detail": "目的国清关资料已提交，等待海关审核放行。",
    "tracking.step6Title": "派送中",
    "tracking.step6Detail": "货物已交由当地派送渠道，正在安排末端派送。",
    "tracking.step7Title": "已签收",
    "tracking.step7Detail": "货物已完成签收，服务流程结束。",
    "tracking.exceptionTitle": "运输异常",
    "tracking.exceptionDetail": "当前货件存在资料、清关或派送异常，请联系业务人员协助处理。",
    "contact.eyebrow": "Contact",
    "contact.title": "欢迎咨询国际物流方案",
    "contact.copy": "联系方式、公司地址、工作时间及二维码区域可在后续替换为真实信息。",
    "contact.phoneLabel": "电话：",
    "contact.emailLabel": "邮箱：",
    "contact.addressLabel": "地址：",
    "contact.addressValue": "广州市，花都区罗仙村罗仙八队四巷一号",
  },
  en: {
    "meta.description": "Official website of Guangzhou Pengyang International Logistics Co., Ltd., featuring international ocean freight, air freight, customs clearance, warehousing, delivery, and shipment tracking.",
    "company.name": "Guangzhou Pengyang International Logistics Co., Ltd.",
    "brand.aria": "Guangzhou Pengyang International Logistics Co., Ltd. homepage",
    "brand.logoAlt": "Guangzhou Pengyang International Logistics Co., Ltd. logo",
    "nav.aria": "Main navigation",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.tracking": "Tracking",
    "nav.contact": "Contact",
    "language.aria": "Language switcher",
    "hero.eyebrow": "International Freight Forwarding",
    "hero.title": "Connecting global routes, protecting every cross-border delivery",
    "hero.copy": "Guangzhou Pengyang International Logistics Co., Ltd. focuses on international freight forwarding, providing one-stop solutions for ocean freight, air freight, customs clearance, warehousing, and door-to-door logistics.",
    "hero.primaryCta": "Track Shipment",
    "hero.secondaryCta": "View Services",
    "hero.panelAria": "Business overview",
    "hero.panelTitle": "Global Logistics",
    "hero.panelText": "Ocean / Air / Customs / Warehousing",
    "about.eyebrow": "About Pengyang",
    "about.title": "A professional, reliable, and efficient international logistics partner",
    "about.cardTitle": "Company Profile",
    "about.p1": "Based in Guangzhou and serving the global market, Guangzhou Pengyang International Logistics Co., Ltd. is committed to visible, standardized, and practical international logistics services for trading companies, cross-border e-commerce, and supply chain clients.",
    "about.p2": "This profile is placeholder content and can later be replaced with real information such as founding year, route resources, partner network, team scale, and qualifications.",
    "about.metricsAria": "Service advantages",
    "metrics.globalTitle": "Global",
    "metrics.globalText": "Route resources",
    "metrics.solutionTitle": "One-stop",
    "metrics.solutionText": "Logistics solutions",
    "metrics.trackingTitle": "End-to-end",
    "metrics.trackingText": "Milestone tracking",
    "services.eyebrow": "Services",
    "services.title": "Full-chain cross-border transportation coverage",
    "services.seaTitle": "Ocean Freight",
    "services.seaText": "FCL, LCL, port-to-port, and door-to-door solutions for bulk cargo and regular foreign trade shipments.",
    "services.airTitle": "Air Freight",
    "services.airText": "Flexible air freight services for time-sensitive goods, urgent replenishment, samples, and high-value cargo.",
    "services.customsTitle": "Customs Clearance",
    "services.customsText": "Support for declaration, clearance, documentation, and compliance to reduce uncertainty in cross-border delivery.",
    "services.doorTitle": "Door-to-door Logistics",
    "services.doorText": "Integrated trucking, warehousing, mainline transport, and destination delivery for end-to-end execution.",
    "tracking.eyebrow": "Tracking",
    "tracking.title": "Shipment Tracking",
    "tracking.copy": "This is a front-end demo. Enter multiple tracking, bill of lading, or container numbers to view simulated logistics milestones. The interface can be retained when a real API is connected later.",
    "tracking.label": "Tracking No. / B/L No. / Container No.",
    "tracking.placeholder": "Example: PY-WH-001\nPY-IN-002",
    "tracking.tip": "Separate numbers by line breaks, spaces, or commas. Up to 30 numbers per search.",
    "tracking.button": "Search",
    "tracking.loading": "Searching...",
    "tracking.emptyTitle": "Ready to Search",
    "tracking.emptyText": "Enter one or more numbers to view logistics progress",
    "tracking.resultNote": "Demo result for front-end display only",
    "tracking.batchNote": "Generated demo results for {count} numbers.",
    "tracking.limitNote": "Up to 30 numbers are supported per search. Showing the first 30.",
    "tracking.workspaceAria": "Shipment tracking workspace",
    "tracking.listTitle": "Tracking Numbers",
    "tracking.detailEmptyTitle": "Select a number on the left",
    "tracking.detailEmptyText": "The detail panel will show international route, customer name, destination, and shipment milestones.",
    "tracking.detailTitle": "Tracking Details",
    "tracking.customer": "Customer",
    "tracking.route": "International Route",
    "tracking.origin": "Origin",
    "tracking.destination": "Destination",
    "tracking.serviceType": "Service Type",
    "tracking.eta": "Estimated Arrival",
    "tracking.elapsedDays": "Elapsed Time",
    "tracking.elapsedDaysValue": "{days} days in transit",
    "tracking.latest": "Latest Milestone",
    "tracking.customerValue": "Sample Customer",
    "tracking.routeValue": "Guangzhou, China - Kuala Lumpur, Malaysia",
    "tracking.originValue": "Guangzhou Warehouse",
    "tracking.destinationValue": "Kuala Lumpur",
    "tracking.serviceTypeValue": "International Air Freight + Customs Delivery",
    "tracking.etaValue": "3-5 business days",
    "tracking.status": "In Transit",
    "tracking.statusWarehouse": "In Warehouse",
    "tracking.statusInternational": "International Transit",
    "tracking.statusCustoms": "Customs Clearance",
    "tracking.statusDelivery": "Out for Delivery",
    "tracking.statusSigned": "Delivered",
    "tracking.statusException": "Exception",
    "tracking.notFoundStatus": "Not Found",
    "tracking.notFoundTitle": "No shipment information found",
    "tracking.notFoundText": "Please check whether the number is correct or try again later. Newly created shipments may take time to sync.",
    "tracking.step1Title": "Order Accepted",
    "tracking.step1Detail": "Pengyang has received the shipment request and is checking booking and documentation details.",
    "tracking.step2Title": "Cargo Received",
    "tracking.step2Detail": "The cargo has been scanned into the warehouse and is waiting for line-haul arrangement.",
    "tracking.step3Title": "International Transit",
    "tracking.step3Detail": "The cargo has entered the international transportation stage. Customs updates are expected later.",
    "tracking.step4Title": "Destination Handling",
    "tracking.step4Detail": "The destination agent is processing arrival, customs clearance, and delivery arrangements.",
    "tracking.step5Title": "Customs Clearance",
    "tracking.step5Detail": "Destination customs documents have been submitted and are awaiting review and release.",
    "tracking.step6Title": "Out for Delivery",
    "tracking.step6Detail": "The shipment has been handed to the local delivery channel for final delivery.",
    "tracking.step7Title": "Delivered",
    "tracking.step7Detail": "The shipment has been signed for and the service process is complete.",
    "tracking.exceptionTitle": "Shipment Exception",
    "tracking.exceptionDetail": "This shipment has a documentation, customs, or delivery exception. Please contact the service team for support.",
    "contact.eyebrow": "Contact",
    "contact.title": "Talk to us about your international logistics plan",
    "contact.copy": "Contact details, office address, working hours, and QR codes can be replaced with official information later.",
    "contact.phoneLabel": "Phone: ",
    "contact.emailLabel": "Email: ",
    "contact.addressLabel": "Address: ",
    "contact.addressValue": "No. 1, Lane 4, Luoxian 8th Team, Luoxian Village, Huadu District, Guangzhou",
  },
  ms: {
    "meta.description": "Laman rasmi Guangzhou Pengyang International Logistics Co., Ltd., memaparkan perkhidmatan pengangkutan laut, udara, pelepasan kastam, gudang, penghantaran, dan penjejakan logistik.",
    "company.name": "Guangzhou Pengyang International Logistics Co., Ltd.",
    "brand.aria": "Laman utama Guangzhou Pengyang International Logistics Co., Ltd.",
    "brand.logoAlt": "Logo Guangzhou Pengyang International Logistics Co., Ltd.",
    "nav.aria": "Navigasi utama",
    "nav.about": "Profil",
    "nav.services": "Perkhidmatan",
    "nav.tracking": "Jejak Logistik",
    "nav.contact": "Hubungi Kami",
    "language.aria": "Penukar bahasa",
    "hero.eyebrow": "International Freight Forwarding",
    "hero.title": "Menghubungkan laluan global, menjaga setiap penghantaran rentas sempadan",
    "hero.copy": "Guangzhou Pengyang International Logistics Co., Ltd. menumpukan perkhidmatan ejen kargo antarabangsa, termasuk pengangkutan laut, udara, pelepasan kastam, pergudangan, dan logistik pintu ke pintu.",
    "hero.primaryCta": "Jejak Logistik",
    "hero.secondaryCta": "Lihat Servis",
    "hero.panelAria": "Gambaran perniagaan",
    "hero.panelTitle": "Global Logistics",
    "hero.panelText": "Laut / Udara / Kastam / Gudang",
    "about.eyebrow": "About Pengyang",
    "about.title": "Rakan logistik antarabangsa yang profesional, stabil, dan cekap",
    "about.cardTitle": "Profil Syarikat",
    "about.p1": "Berpangkalan di Guangzhou dan berkhidmat untuk pasaran global, Guangzhou Pengyang International Logistics Co., Ltd. komited menyediakan perkhidmatan logistik antarabangsa yang jelas, tersusun, dan praktikal untuk syarikat perdagangan, e-dagang rentas sempadan, dan pelanggan rantaian bekalan.",
    "about.p2": "Kandungan ini ialah teks sementara dan boleh digantikan kemudian dengan maklumat sebenar seperti tahun penubuhan, sumber laluan, rangkaian rakan kongsi, saiz pasukan, dan kelayakan.",
    "about.metricsAria": "Kelebihan perkhidmatan",
    "metrics.globalTitle": "Global",
    "metrics.globalText": "Sumber laluan",
    "metrics.solutionTitle": "Sehenti",
    "metrics.solutionText": "Penyelesaian logistik",
    "metrics.trackingTitle": "Menyeluruh",
    "metrics.trackingText": "Penjejakan status",
    "services.eyebrow": "Services",
    "services.title": "Liputan penuh untuk pengangkutan rentas sempadan",
    "services.seaTitle": "Pengangkutan Laut",
    "services.seaText": "Penyelesaian FCL, LCL, pelabuhan ke pelabuhan, dan pintu ke pintu untuk kargo pukal serta penghantaran perdagangan biasa.",
    "services.airTitle": "Pengangkutan Udara",
    "services.airText": "Perkhidmatan udara yang fleksibel untuk barangan segera, stok tambahan, sampel, dan kargo bernilai tinggi.",
    "services.customsTitle": "Pelepasan Kastam",
    "services.customsText": "Sokongan deklarasi, pelepasan kastam, dokumen, dan pematuhan untuk mengurangkan ketidakpastian penghantaran rentas sempadan.",
    "services.doorTitle": "Logistik Pintu ke Pintu",
    "services.doorText": "Gabungan trak, gudang, pengangkutan utama, dan penghantaran destinasi untuk pelaksanaan hujung ke hujung.",
    "tracking.eyebrow": "Tracking",
    "tracking.title": "Jejak Logistik",
    "tracking.copy": "Ini ialah demo bahagian hadapan. Masukkan beberapa nombor penjejakan, bil muatan, atau kontena untuk melihat status simulasi. Antara muka ini boleh dikekalkan apabila API sebenar disambungkan nanti.",
    "tracking.label": "No. Jejak / No. B/L / No. Kontena",
    "tracking.placeholder": "Contoh: PY-WH-001\nPY-IN-002",
    "tracking.tip": "Pisahkan nombor dengan baris baharu, ruang, atau koma. Maksimum 30 nombor setiap carian.",
    "tracking.button": "Cari",
    "tracking.loading": "Mencari...",
    "tracking.emptyTitle": "Sedia Dicari",
    "tracking.emptyText": "Masukkan satu atau beberapa nombor untuk melihat perkembangan logistik",
    "tracking.resultNote": "Keputusan demo untuk paparan bahagian hadapan sahaja",
    "tracking.batchNote": "Keputusan demo dijana untuk {count} nombor.",
    "tracking.limitNote": "Maksimum 30 nombor disokong setiap carian. Memaparkan 30 nombor pertama.",
    "tracking.workspaceAria": "Ruang kerja penjejakan logistik",
    "tracking.listTitle": "Nombor Jejak",
    "tracking.detailEmptyTitle": "Pilih nombor di sebelah kiri",
    "tracking.detailEmptyText": "Panel kanan akan memaparkan laluan antarabangsa, nama pelanggan, destinasi, dan status penghantaran.",
    "tracking.detailTitle": "Butiran Penjejakan",
    "tracking.customer": "Pelanggan",
    "tracking.route": "Laluan Antarabangsa",
    "tracking.origin": "Tempat Asal",
    "tracking.destination": "Destinasi",
    "tracking.serviceType": "Jenis Servis",
    "tracking.eta": "Anggaran Tiba",
    "tracking.elapsedDays": "Tempoh Semasa",
    "tracking.elapsedDaysValue": "{days} hari dalam transit",
    "tracking.latest": "Status Terkini",
    "tracking.customerValue": "Pelanggan Contoh",
    "tracking.routeValue": "Guangzhou, China - Kuala Lumpur, Malaysia",
    "tracking.originValue": "Gudang Guangzhou",
    "tracking.destinationValue": "Kuala Lumpur",
    "tracking.serviceTypeValue": "Pengangkutan Udara Antarabangsa + Kastam dan Penghantaran",
    "tracking.etaValue": "3-5 hari bekerja",
    "tracking.status": "Dalam Transit",
    "tracking.statusWarehouse": "Sudah Masuk Gudang",
    "tracking.statusInternational": "Transit Antarabangsa",
    "tracking.statusCustoms": "Pelepasan Kastam",
    "tracking.statusDelivery": "Sedang Dihantar",
    "tracking.statusSigned": "Telah Diterima",
    "tracking.statusException": "Pengecualian",
    "tracking.notFoundStatus": "Tidak Ditemui",
    "tracking.notFoundTitle": "Maklumat logistik belum ditemui",
    "tracking.notFoundText": "Sila semak nombor dan cuba lagi kemudian. Penghantaran baharu mungkin memerlukan masa untuk disegerakkan.",
    "tracking.step1Title": "Pesanan Diterima",
    "tracking.step1Detail": "Pengyang telah menerima permintaan penghantaran dan sedang menyemak tempahan serta dokumen.",
    "tracking.step2Title": "Kargo Diterima",
    "tracking.step2Detail": "Kargo telah diimbas masuk ke gudang dan menunggu aturan pengangkutan utama.",
    "tracking.step3Title": "Transit Antarabangsa",
    "tracking.step3Detail": "Kargo telah memasuki peringkat pengangkutan antarabangsa. Kemas kini kastam akan menyusul.",
    "tracking.step4Title": "Pengendalian Destinasi",
    "tracking.step4Detail": "Ejen destinasi sedang mengurus ketibaan, pelepasan kastam, dan susunan penghantaran.",
    "tracking.step5Title": "Pelepasan Kastam",
    "tracking.step5Detail": "Dokumen kastam destinasi telah dihantar dan sedang menunggu semakan serta pelepasan.",
    "tracking.step6Title": "Sedang Dihantar",
    "tracking.step6Detail": "Penghantaran telah diserahkan kepada saluran tempatan untuk penghantaran akhir.",
    "tracking.step7Title": "Telah Diterima",
    "tracking.step7Detail": "Penghantaran telah diterima dan proses servis telah selesai.",
    "tracking.exceptionTitle": "Pengecualian Penghantaran",
    "tracking.exceptionDetail": "Penghantaran ini mempunyai isu dokumen, kastam, atau penghantaran. Sila hubungi pasukan servis untuk bantuan.",
    "contact.eyebrow": "Contact",
    "contact.title": "Hubungi kami untuk pelan logistik antarabangsa",
    "contact.copy": "Butiran hubungan, alamat pejabat, waktu kerja, dan kod QR boleh digantikan dengan maklumat rasmi kemudian.",
    "contact.phoneLabel": "Telefon: ",
    "contact.emailLabel": "E-mel: ",
    "contact.addressLabel": "Alamat: ",
    "contact.addressValue": "No. 1, Lorong 4, Pasukan Luoxian 8, Kampung Luoxian, Daerah Huadu, Guangzhou",
  },
};

let currentLanguage = localStorage.getItem("pengyang-language") || "zh";
let currentTrackingNumbers = [];
let currentTrackingRecords = [];
let activeTrackingNumber = "";

function t(key) {
  return translations[currentLanguage][key] || translations.zh[key] || key;
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "zh";
  localStorage.setItem("pengyang-language", currentLanguage);
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : currentLanguage;
  document.title = t("company.name");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attribute, key] = pair.split(":");
      if (attribute && key) {
        element.setAttribute(attribute, t(key));
      }
    });
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (form) {
    if (currentTrackingRecords.length) {
      renderShipmentList(currentTrackingRecords, false);
    } else {
      renderEmptyState();
    }
  }

  updateActiveNav();
}

function renderEmptyState() {
  if (result) {
    result.innerHTML = `
      <div class="empty-state">
        <strong>${t("tracking.emptyTitle")}</strong>
        <span>${t("tracking.emptyText")}</span>
      </div>
    `;
  }

  if (shipmentList) {
    shipmentList.innerHTML = `
      <div class="empty-state compact-empty">
        <strong>${t("tracking.emptyTitle")}</strong>
        <span>${t("tracking.emptyText")}</span>
      </div>
    `;
  }

  if (shipmentDetail) {
    shipmentDetail.innerHTML = `
      <div class="detail-placeholder">
        <img src="assets/logo-blue.png" alt="" />
        <strong>${t("tracking.detailEmptyTitle")}</strong>
        <span>${t("tracking.detailEmptyText")}</span>
      </div>
    `;
  }

  if (trackingCount) {
    trackingCount.textContent = "0/30";
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function parseTrackingNumbers(value) {
  const numbers = value
    .split(/[\s,，;；、]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    numbers: numbers.slice(0, 30),
    exceededLimit: numbers.length > 30,
  };
}

function formatTemplate(key, values) {
  return Object.entries(values).reduce((message, [name, value]) => message.replace(`{${name}}`, value), t(key));
}

function getRouteByVariant(routeVariant) {
  const lanes = [
    {
      route: t("tracking.routeValue"),
      origin: t("tracking.originValue"),
      destination: t("tracking.destinationValue"),
      serviceType: t("tracking.serviceTypeValue"),
      eta: t("tracking.etaValue"),
    },
    {
      route: currentLanguage === "zh" ? "中国广州 - 新加坡" : currentLanguage === "ms" ? "Guangzhou, China - Singapura" : "Guangzhou, China - Singapore",
      origin: t("tracking.originValue"),
      destination: currentLanguage === "zh" ? "新加坡" : currentLanguage === "ms" ? "Singapura" : "Singapore",
      serviceType: currentLanguage === "zh" ? "国际海运 + 目的港派送" : currentLanguage === "ms" ? "Pengangkutan Laut Antarabangsa + Penghantaran Destinasi" : "International Ocean Freight + Destination Delivery",
      eta: currentLanguage === "zh" ? "7-12 个工作日" : currentLanguage === "ms" ? "7-12 hari bekerja" : "7-12 business days",
    },
    {
      route: currentLanguage === "zh" ? "中国广州 - 泰国曼谷" : currentLanguage === "ms" ? "Guangzhou, China - Bangkok, Thailand" : "Guangzhou, China - Bangkok, Thailand",
      origin: t("tracking.originValue"),
      destination: currentLanguage === "zh" ? "曼谷" : "Bangkok",
      serviceType: currentLanguage === "zh" ? "跨境专线 + 清关派送" : currentLanguage === "ms" ? "Laluan Rentas Sempadan + Kastam dan Penghantaran" : "Cross-border Line + Customs Delivery",
      eta: currentLanguage === "zh" ? "5-8 个工作日" : currentLanguage === "ms" ? "5-8 hari bekerja" : "5-8 business days",
    },
  ];

  return lanes[routeVariant % lanes.length];
}

function adaptTrackingRecord(record) {
  const isNotFound = record.status === "NOT_FOUND";
  const steps = record.nodes.map((node) => ({
    time: node.time,
    title: t(node.titleKey),
    detail: t(node.detailKey),
  }));
  const latestStep = steps[steps.length - 1];
  const customerName = typeof record.customerName === "object"
    ? `${t(record.customerName.key)} ${record.customerName.suffix}`
    : record.customerName;

  if (isNotFound) {
    return {
      number: record.trackingNo,
      customer: "-",
      latest: t("tracking.notFoundTitle"),
      latestTime: "-",
      isNotFound: true,
      status: t(record.statusKey),
      statusTone: record.statusTone,
      elapsedDays: 0,
      steps: [],
    };
  }

  return {
    number: record.trackingNo,
    customer: customerName,
    latest: latestStep.title,
    latestTime: latestStep.time,
    isNotFound: false,
    status: t(record.statusKey),
    statusTone: record.statusTone,
    elapsedDays: record.elapsedDays,
    steps,
    ...getRouteByVariant(record.routeVariant),
  };
}

function renderShipmentList(records, exceededLimit) {
  if (!shipmentList || !shipmentDetail) {
    return;
  }

  const shipments = records.map(adaptTrackingRecord);
  const trackingNumbers = shipments.map((shipment) => shipment.number);
  activeTrackingNumber = activeTrackingNumber && trackingNumbers.includes(activeTrackingNumber) ? activeTrackingNumber : trackingNumbers[0];

  shipmentList.innerHTML = `
    ${exceededLimit ? `<div class="batch-notice">${t("tracking.limitNote")}</div>` : ""}
    ${shipments
      .map(
        (shipment) => `
          <button class="shipment-list-item ${shipment.number === activeTrackingNumber ? "is-active" : ""}" type="button" data-tracking-number="${escapeHtml(shipment.number)}">
            <span class="shipment-row-top">
              <strong>${escapeHtml(shipment.number)}</strong>
              <em class="${shipment.isNotFound ? "is-missing" : `is-${shipment.statusTone}`}">${shipment.status}</em>
            </span>
            <span>${escapeHtml(shipment.customer)}</span>
            <small>${escapeHtml(shipment.latest)}${shipment.latestTime !== "-" ? ` · ${escapeHtml(shipment.latestTime)}` : ""}</small>
            ${shipment.isNotFound ? "" : `<b>${formatTemplate("tracking.elapsedDaysValue", { days: shipment.elapsedDays })}</b>`}
          </button>
        `
      )
      .join("")}
  `;

  if (trackingCount) {
    trackingCount.textContent = `${records.length}/30`;
  }

  shipmentList.querySelectorAll(".shipment-list-item").forEach((button) => {
    button.addEventListener("click", () => {
      activeTrackingNumber = button.dataset.trackingNumber;
      renderShipmentList(currentTrackingRecords, false);
    });
  });

  const activeShipment = shipments.find((shipment) => shipment.number === activeTrackingNumber) || shipments[0];
  renderShipmentDetail(activeShipment);
}

function renderShipmentDetail(shipment) {
  if (shipment.isNotFound) {
    shipmentDetail.innerHTML = `
      <div class="detail-head">
        <div>
          <p class="eyebrow">${t("tracking.detailTitle")}</p>
          <h2>${escapeHtml(shipment.number)}</h2>
        </div>
        <span class="status-pill is-missing">${shipment.status}</span>
      </div>
      <div class="not-found-panel">
        <strong>${t("tracking.notFoundTitle")}</strong>
        <span>${t("tracking.notFoundText")}</span>
      </div>
    `;
    return;
  }

  shipmentDetail.innerHTML = `
    <div class="detail-head">
      <div>
        <p class="eyebrow">${t("tracking.detailTitle")}</p>
        <h2>${escapeHtml(shipment.number)}</h2>
      </div>
      <span class="status-pill is-${shipment.statusTone}">${shipment.status}</span>
    </div>
    <div class="detail-grid">
      <div><span>${t("tracking.customer")}</span><strong>${escapeHtml(shipment.customer)}</strong></div>
      <div><span>${t("tracking.route")}</span><strong>${escapeHtml(shipment.route)}</strong></div>
      <div><span>${t("tracking.origin")}</span><strong>${escapeHtml(shipment.origin)}</strong></div>
      <div><span>${t("tracking.destination")}</span><strong>${escapeHtml(shipment.destination)}</strong></div>
      <div><span>${t("tracking.serviceType")}</span><strong>${escapeHtml(shipment.serviceType)}</strong></div>
      <div><span>${t("tracking.elapsedDays")}</span><strong>${formatTemplate("tracking.elapsedDaysValue", { days: shipment.elapsedDays })}</strong></div>
    </div>
    <section class="detail-panel">
      <h3>${t("tracking.latest")}</h3>
      <ol class="timeline detail-timeline">
        ${shipment.steps
          .slice()
          .reverse()
          .map(
            (step) => `
              <li>
                <span class="timeline-dot" aria-hidden="true"></span>
                <div>
                  <time>${step.time}</time>
                  <strong>${step.title}</strong>
                  <span>${step.detail}</span>
                </div>
              </li>
            `
          )
          .join("")}
      </ol>
    </section>
  `;
}

function setQueryLoading(isLoading) {
  if (!queryButton) {
    return;
  }

  queryButton.disabled = isLoading;
  queryButton.textContent = isLoading ? t("tracking.loading") : t("tracking.button");
}

async function renderTracking(inputValue) {
  const parsed = Array.isArray(inputValue)
    ? { numbers: inputValue, exceededLimit: false }
    : parseTrackingNumbers(inputValue);
  const numbers = parsed.numbers.length ? parsed.numbers : ["PY20260520001"];

  currentTrackingNumbers = numbers;

  if (!shipmentList || !shipmentDetail || typeof queryTrackingRecords !== "function") {
    renderLegacyTracking(numbers, parsed.exceededLimit);
    return;
  }

  setQueryLoading(true);

  try {
    const response = await queryTrackingRecords(numbers);

    if (response.throttled && !response.data) {
      return;
    }

    currentTrackingRecords = response.data || currentTrackingRecords;
    renderShipmentList(currentTrackingRecords, parsed.exceededLimit);
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error);
    }
  } finally {
    setQueryLoading(false);
  }
}

function renderLegacyTracking(numbers, exceededLimit) {
  currentTrackingNumbers = numbers;

  if (shipmentList && shipmentDetail) {
    renderShipmentList(currentTrackingRecords, exceededLimit);
    return;
  }

  if (!result) {
    return;
  }

  result.innerHTML = `
    ${exceededLimit ? `<div class="batch-notice">${t("tracking.limitNote")}</div>` : ""}
    <div class="batch-notice">${formatTemplate("tracking.batchNote", { count: numbers.length })}</div>
    <div class="tracking-result-list">
      ${numbers
        .map(
          (number) => `
            <article class="tracking-result-card">
              <div class="tracking-summary">
                <div>
                  <strong>${escapeHtml(number)}</strong>
                  <span>${t("tracking.resultNote")}</span>
                </div>
                <span class="status-pill">${t("tracking.status")}</span>
              </div>
              <ol class="timeline">
                ${[
                  { title: t("tracking.step1Title"), detail: t("tracking.step1Detail") },
                  { title: t("tracking.step2Title"), detail: t("tracking.step2Detail") },
                  { title: t("tracking.step3Title"), detail: t("tracking.step3Detail") },
                ]
                  .map(
                    (step) => `
                      <li>
                        <span class="timeline-dot" aria-hidden="true"></span>
                        <div>
                          <strong>${step.title}</strong>
                          <span>${step.detail}</span>
                        </div>
                      </li>
                    `
                  )
                  .join("")}
              </ol>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const target = link.dataset.pageLink || link.dataset.section;
    link.classList.toggle("is-active", target === sectionId);
  });
}

function updateActiveNav() {
  if (currentPage !== "home" || !observedSections.length) {
    setActiveNav(currentPage);
    return;
  }

  const headerOffset = document.querySelector(".site-header").offsetHeight + 36;
  let activeSection = "about";

  observedSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= headerOffset) {
      activeSection = section.id;
    }
  });

  setActiveNav(activeSection);
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveNav(link.dataset.pageLink || link.dataset.section));
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderTracking(input.value);
  });
}

applyLanguage(currentLanguage);

if (form && input.value.trim() && !currentTrackingNumbers.length) {
  renderTracking(input.value);
}
