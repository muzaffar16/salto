DELETE FROM product_monthly_orders
WHERE month_year < TO_CHAR(NOW() - INTERVAL '1 month', 'YYYY-MM');
