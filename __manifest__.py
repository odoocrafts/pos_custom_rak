# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'RAK POS Custom',
    'version': '1.0',
    'category': 'Sales/Point of Sale',
    'summary': 'POS manual price tax inclusion',
    'depends': ['point_of_sale'],
    'data': [],
    'assets': {
        'point_of_sale._assets_pos': [
            'RAK/static/src/app/pos_order_line.js',
            'RAK/static/src/app/tax_toggle_button.xml',
            'RAK/static/src/app/tax_toggle_button.js',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}
