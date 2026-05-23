# Java 接口接入说明

这个前端项目已经把物流查询整理成了独立 API 层，后续接 Java 后端时优先改 `tracking-api.js`。

## 当前结构

- `tracking.html`：物流查询页面
- `script.js`：页面渲染、多语言、事件绑定
- `tracking-api.js`：查询接口层、mock 数据、前端防重复请求
- `styles.css`：页面样式

## 推荐接口

```http
POST /api/tracking/batch
Content-Type: application/json

{
  "trackingNos": ["PY-WH-001", "PY-IN-002"]
}
```

推荐返回结构：

```json
{
  "success": true,
  "data": [
    {
      "trackingNo": "PY-IN-002",
      "status": "IN_TRANSIT",
      "customerName": "客户名称",
      "routeVariant": 0,
      "elapsedDays": 3,
      "nodes": [
        {
          "code": "STEP_1",
          "time": "2026-05-17 09:18",
          "titleKey": "tracking.step1Title",
          "detailKey": "tracking.step1Detail"
        }
      ]
    }
  ]
}
```

## 状态码

前后端建议统一使用这些状态码：

- `WAREHOUSE`：已入仓
- `IN_TRANSIT`：国际运输中
- `CUSTOMS`：清关中
- `DELIVERY`：派送中
- `SIGNED`：已签收
- `EXCEPTION`：异常件
- `NOT_FOUND`：未查询到

## 前端防重复查询

`tracking-api.js` 已经加了：

- 查询按钮 loading 禁用
- 2 秒内重复查询节流
- 相同单号组合 60 秒缓存
- 新请求会取消上一个未完成请求
- 单次最多 30 个单号

## 接真实接口时怎么改

只需要替换 `tracking-api.js` 里的 `requestTrackingRecords(numbers, options)`：

```js
async function requestTrackingRecords(numbers, options = {}) {
  const response = await fetch("/api/tracking/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trackingNos: numbers,
    }),
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error("Tracking query failed");
  }

  const payload = await response.json();
  return payload.data || [];
}
```

页面渲染层不需要大改。
