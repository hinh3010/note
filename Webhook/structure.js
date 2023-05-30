[
    {
        name: "register to receive webhook events",
        methods: 'POST',
        url: 'https://seller-staging.merchize.com/orders/webhooks',
        request: {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer hellocacbantre",
            },
            payload: {
                url_end_point: "https://hellocacbantre.vn",
                event_types: [
                    {
                        name: "ORDER.CREATED",
                    },
                    {
                        name: "ORDER.CHANGED",
                    },
                    {
                        name: "ORDER.REFUNDED",
                    },
                ],
            },
        },
        response: {
            id: "0EH40505U7160970P",
            url_end_point: "https://hellocacbantre.vn",
            event_types: [
                {
                    name: "ORDER.CREATED",
                    description: "Receive notification when a new order is successfully created"
                },
                {
                    name: "ORDER.CHANGED",
                    description: "Receive notification when order change progress"
                },
                {
                    name: "ORDER.REFUNDED",
                    description: "Receive notification when an order is returned"
                }
            ],
            success: true
        }
    },
    {
        name: "update receive webhook event",
        methods: 'PATCH',
        url: 'https://seller-staging.merchize.com/orders/webhooks/:id',
        request: {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer hellocacbantre",
            },
            payload: [
                {
                    option: 'replace',
                    path: 'url_end_point',
                    value: "https://hellocacbantre.com",
                },
                {
                    option: 'replace',
                    path: 'event_types',
                    value: [
                        {
                            name: "ORDER.CREATED",
                        },
                    ],
                }
            ]
        },
        response: {
            id: "0EH40505U7160970P",
            url_end_point: "https://hellocacbantre.com",
            event_types: [
                {
                    name: "ORDER.CREATED",
                    description: "Receive notification when a new order is successfully created"
                }
            ],
            success: true
        }
    },
    {
        name: "delete receive webhook event",
        methods: 'DELETE',
        url: 'https://seller-staging.merchize.com/orders/webhooks/:id',
        request: {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer hellocacbantre",
            }
        },
        response: {
            id: "0EH40505U7160970P",
            url_end_point: "https://hellocacbantre.com",
            success: true
        }
    },
    {
        name: "List event subscriptions for webhook",
        methods: 'GET',
        url: 'https://seller-staging.merchize.com/orders/webhooks/:id/event-types',
        request: {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer hellocacbantre",
            }
        },
        response: [
            {
                name: "ORDER.CREATED",
                description: "Receive notification when a new order is successfully created",
                status: "ENABLED" // "DEPRECATED"
            }
        ]
    },
    {
        name: "List available events",
        methods: 'GET',
        url: 'https://seller-staging.merchize.com/orders/webhooks/event-types',
        request: {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer hellocacbantre",
            }
        },
        response: [
            {
                name: "ORDER.CREATED",
                description: "Receive notification when a new order is successfully created",
                contact: "linhctt@gmail.com",
                service: 'sync order'
            },
            {
                name: "ORDER.CHANGED",
                description: "Receive notification when order change progress",
                contact: "linhctt@gmail.com",
                service: 'sync order'
            },
            {
                name: "ORDER.REFUNDED",
                description: "Receive notification when an order is returned",
                contact: "linhctt@gmail.com",
                service: 'sync order'
            }
        ]

    },
    {
        name: "Resend",
        methods: 'POST',
        url: 'https://hellocacbantre.com',
        request: {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer hellocacbantre",
            },
            payload: {
                id: "adu",
                event_types: "ORDER.CREATED",
                create_at: "2013-12-31T23:59:59Z",
                resource: {
                    "admin_graphql_api_id": "gid://shopify/Order/820982911946154508",
                    "app_id": null,
                    "browser_ip": null,
                    "buyer_accepts_marketing": true,
                    "cancel_reason": "customer",
                    "cancelled_at": "2021-12-31T19:00:00-05:00",
                    "cart_token": null,
                    "checkout_id": null,
                    "checkout_token": null,
                    "closed_at": null,
                    "confirmed": false,
                    "contact_email": "jon@example.com",
                    "created_at": "2021-12-31T19:00:00-05:00",
                    "currency": "USD",
                    "current_subtotal_price": "398.00",
                    "current_subtotal_price_set": {
                        "shop_money": {
                            "amount": "398.00",
                            "currency_code": "USD"
                        },
                        "presentment_money": {
                            "amount": "398.00",
                            "currency_code": "USD"
                        }
                    },
                }
            }
        },
    },
];
