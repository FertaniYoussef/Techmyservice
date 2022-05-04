import { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 60
    }
    
  });


  const InvoiceNo = ({invoice}) => {
   
       return (
            <div>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Invoice ID:</Text>
                <Text style={styles.invoiceDate}>{invoice.id}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Date: </Text>
                <Text >{new Date(invoice.start).toLocaleDateString('en-gb')}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Time: </Text>
                <Text >{new Date(invoice.start).toLocaleTimeString('en-gb')}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Driver: </Text>
              {invoice.driver!=undefined ?  <Text >{invoice.driver.name} {invoice.driver.prename}</Text>: null}
            </View >
            </div>
       )
       };
  
  export default InvoiceNo