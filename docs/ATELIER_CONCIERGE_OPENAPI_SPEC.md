# Atelier Concierge & Bespoke Salon API Specification (OpenAPI 3.1)

This specification defines the contract between the Frontend/Client applications and the `vip-concierge-kotlin` & `bff-gateway-ts` microservices.

## Overview

- **Base URL**: `https://api.clothyy.com/v1/concierge`
- **Protocol**: HTTPS / TLS 1.3
- **Authentication**: Bearer JWT (`Authorization: Bearer <token>`) with `scope: vip:atelier`

## Endpoints

### 1. `POST /appointments/book`
Reserves a private salon consultation with a master tailor or stylist.

#### Request Body
```json
{
  "clientId": "cli-vip-4290",
  "stylistId": "sty-antoine-paris",
  "salonLocation": "Paris Vendôme Salon",
  "startTime": "2026-11-20T14:00:00Z",
  "endTime": "2026-11-20T16:00:00Z",
  "bespokeRequirements": {
    "fabricSelection": "Lyon Silk Velvet",
    "silhouette": "Tailored Tuxedo",
    "monogramInitials": "H.H."
  }
}
```

#### Response (201 Created)
```json
{
  "appointmentId": "apt-2026-vendome-098",
  "status": "CONFIRMED",
  "stylist": {
    "name": "Antoine de Saint-Germain",
    "title": "Master Couturier"
  },
  "salonSuite": "Suite Gabrielle",
  "securityAccessPin": "9421"
}
```

### 2. `GET /stylists/affinity`
Matches a VIP client's style profile against available atelier couturiers.

#### Query Parameters
- `clientId`: string (required)
- `season`: string (`FW26`, `SS27`, etc.)

#### Response (200 OK)
```json
{
  "recommendedStylists": [
    {
      "stylistId": "sty-antoine-paris",
      "name": "Antoine de Saint-Germain",
      "affinityScore": 0.94,
      "specialties": ["Tailored Tuxedo", "Bias-Cut Gown"]
    }
  ]
}
```
