<?php
/**
 * Displays a checkbox item-select box in a payment form
 *
 * This template can be overridden by copying it to yourtheme/invoicing/payment-forms/variations/checkbox.php.
 *
 * @version 1.0.19
 */

defined( 'ABSPATH' ) || exit;

// Prepare the selectable items.
$selectable = array();
foreach ( $form->get_items() as $item ) {
    if ( ! $item->is_required ) {
        $selectable[$item->get_id()] = $item->get_name() . ' &mdash; ' . wpinv_price( wpinv_format_amount( $item->get_initial_price() ) );
    }
}

if ( empty( $selectable ) ) {
    return;
}

echo '<div class="getpaid-payment-form-items-checkbox form-group">';

foreach ( $selectable as $item_id => $item_name ) {

    echo aui()->input(
        array(
            'type'       => 'checkbox',
            'name'       => 'getpaid-payment-form-selected-item',
            'id'         => 'getpaid-payment-form-selected-item' . uniqid( '_' ) . $item_id,
            'label'      => $item_name,
            'value'      => $item_id,
            'no_wrap'    => true,
        )
    );

}

echo '</div>';
