/** @odoo-module */

import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/hooks/pos_hook";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";

export class TaxToggleModeButton extends Component {
    static template = "RAK.TaxToggleModeButton";
    static props = {
        class: { type: String, optional: true },
    };

    setup() {
        this.pos = usePos();
        if (this.pos.manual_price_tax_included === undefined) {
            this.pos.manual_price_tax_included = true;
        }
    }

    onClick() {
        this.pos.manual_price_tax_included = !this.pos.manual_price_tax_included;
    }
}

// Add the component so it can be used in the ControlButtons template
Object.assign(ControlButtons.components, { TaxToggleModeButton });
