import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import BillTo from './BillTo'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import { useEffect } from 'react';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });


  const Invoice = ({invoice}) => (


            <Document>
                <Page size="A4" style={styles.page}>
                    <Image style={styles.logo} src={`http://localhost:3001${invoice.service.icon}`} />
                    <InvoiceTitle title={invoice.service.name}/>
                    <InvoiceNo invoice={invoice}/>
                    <BillTo invoice={invoice}/>
                    <InvoiceItemsTable invoice={invoice} />
                   <InvoiceThankYouMsg/>
                </Page>
            </Document>
        );
  
  export default Invoice