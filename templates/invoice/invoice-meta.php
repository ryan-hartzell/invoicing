<?php
/**
 * Displays the invoice meta data.
 *
 * This template can be overridden by copying it to yourtheme/invoicing/invoice/invoice-meta.php.
 *
 * @version 1.0.19
 */

defined( 'ABSPATH' ) || exit;

$class = ! is_singular( 'page' ) ? 'px-1' : '';
?>

        <?php do_action( 'getpaid_before_invoice_meta', $invoice ); ?>
        <div class="getpaid-invoice-meta-data">

            <?php do_action( 'getpaid_before_invoice_meta_table', $invoice ); ?>
            <table class="table table-bordered">
                <tbody>

                    <?php do_action( 'getpaid_before_invoice_meta_rows', $invoice ); ?>
                    <?php foreach ( $meta as $key => $data ) : ?>

                        <?php if ( ! empty( $data['value'] ) && !in_array($key, array('number', 'date')) ) : ?>

                            <?php do_action( "getpaid_before_invoice_meta_$key", $invoice, $data ); ?>

                            <tr class="getpaid-invoice-meta-<?php echo esc_attr( $key ); ?>">

                                <th class="<?php echo esc_attr( $class ); ?> font-weight-bold" style="width: 40%">
                                    <?php echo esc_html( $data['label'] ); ?>
                                </th>

                                <td class="<?php echo esc_attr( $class ); ?> <?php echo 'invoice_total' === $key ? 'font-weight-bold' : 'font-weight-normal'; ?> text-break" style="width: 60%">
                                    <span class="getpaid-invoice-meta-<?php echo esc_attr( $key ); ?>-value"><?php echo wp_kses_post( $data['value'] ); ?></span>
                                </td>

                            </tr>

                            <?php do_action( "getpaid_after_invoice_meta_$key", $invoice, $data ); ?>

                        <?php endif; ?>

                    <?php endforeach; ?>
                    <?php do_action( 'getpaid_after_invoice_meta_rows', $invoice ); ?>

                </tbody>
            </table>
            <?php do_action( 'getpaid_after_invoice_meta_table', $invoice ); ?>


        </div>
        <?php do_action( 'getpaid_after_invoice_meta', $invoice ); ?>

<?php
