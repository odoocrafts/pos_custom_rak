/** @odoo-module */

import { OrderSummary } from "@point_of_sale/app/screens/product_screen/order_summary/order_summary";
import { patch } from "@web/core/utils/patch";
import { accountTaxHelpers } from "@account/helpers/account_tax";

patch(OrderSummary.prototype, {
    async setLinePrice(line, price) {
        if (this.pos.manual_price_tax_included === undefined) {
            this.pos.manual_price_tax_included = true;
        }

        if (this.pos.manual_price_tax_included) {
            const tax_ids = line.tax_ids;
            if (tax_ids && tax_ids.length > 0) {
                const targetPrice = parseFloat(price);
                if (!isNaN(targetPrice)) {
                    const company = line.company;
                    const companyRoundingMethod = company && company.tax_calculation_rounding_method 
                        ? company.tax_calculation_rounding_method 
                        : "round_globally";
                    
                    const taxes_computation = accountTaxHelpers.get_tax_details(
                        tax_ids,
                        targetPrice,
                        1.0,
                        {
                            rounding_method: companyRoundingMethod,
                            product: line.product_id,
                            special_mode: "total_included",
                        }
                    );
                    
                    // Update price to be the base price (tax excluded)
                    price = taxes_computation.total_excluded;
                }
            }
        }
        return super.setLinePrice(line, price);
    }
});
