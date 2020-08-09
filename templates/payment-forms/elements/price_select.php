<?php
/**
 * Displays a radio in payment form
 *
 * This template can be overridden by copying it to yourtheme/invoicing/payment-forms/elements/radio.php.
 *
 * @version 1.0.19
 */

defined( 'ABSPATH' ) || exit;

// Ensure that we have options.
if ( empty( $options ) ) {
    return;
}

// Prepare price options.
$options = getpaid_convert_price_string_to_options( $options );

// Prepare id.
$id = esc_attr( $id );

$select_type = empty( $select_type ) ? 'select' : $select_type;

// Item select;
if ( $select_type == 'select' ) {
    echo aui()->select(
        array(
            'name'       => $id,
            'id'         => $id . uniqid( '_' ),
            'placeholder'=> empty( $placeholder ) ? '' : esc_attr( $placeholder ),
            'label'      => empty( $label ) ? '' : sanitize_text_field( $label ),
            'label_type' => 'vertical',
            'class'      => 'getpaid-price-select-dropdown',
            'help_text'  => empty( $description ) ? '' : wp_kses_post( $description ),
            'options'    => $options,
        )
    );
    return;
}

// Item radios;
if ( $select_type == 'radios' ) {
    echo aui()->radio(
        array(
            'name'       => esc_attr( $id ),
            'id'         => esc_attr( $id ) . uniqid( '_' ),
            'label'      => empty( $label ) ? '' : sanitize_text_field( $label ),
            'label_type' => 'vertical',
            'class'      => 'getpaid-price-select-radio',
            'inline'     => false,
            'options'    => $options,
            'help_text'  => empty( $description ) ? '' : wp_kses_post( $description ),
        )
    );
    return;
}


// Display the label.
if ( ! empty( $label ) && $select_type != 'select' ) {
    $label = sanitize_text_field( $label );
    echo "<label>$label</label>";
}

// Item buttons;
if ( $select_type == 'buttons' || $select_type == 'circles' ) {

    $class = 'getpaid-price-buttons';

    if ( $select_type == 'circles' ) {
        $class .= ' getpaid-price-circles';
    }
    echo "<div class='$class'>";

    $processed = 0;
    foreach ( $options as $price => $label ) {
        $label   = sanitize_text_field( $label );
        $price   = esc_attr( $price );
        $_id     = $id . uniqid( '_' );
        $checked = checked( $processed, 0, false );
        $processed ++;

        $class = 'rounded';

        if ( $select_type == 'circles' ) {
            $class = '';
        }
        echo "
            <span>
                <input type='radio' class='getpaid-price-select-button' id='$_id' value='$price' name='$id' $checked />
                <label for='$_id' class='$class'><span>$label</span></label>
            </span>
            ";
    }

    echo '</div>';

}

// Item checkboxes;
if ( $select_type == 'checkboxes' ) {
    echo '<div class="form-group">';

    $processed = 0;
    foreach ( $options as $price => $label ) {
        $label   = sanitize_text_field( $label );
        $price   = esc_attr( $price );
        $checked = checked( $processed, 0, false );
        $processed ++;
        echo "
            <label class='d-block'>
                <input type='checkbox' class='getpaid-price-select-checkbox' name='{$id}[]' value='$price' $checked />
                <span>$label</span>
            </label>
            ";
    }

    echo '</div>';

}

if ( ! empty( $description ) ) {
    echo "<small class='form-text text-muted'>$description</small>";
}
