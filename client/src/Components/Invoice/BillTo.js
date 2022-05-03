import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });


  const BillTo = ({invoice}) => {
      return (
          <div>
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text>{invoice.client.name} {invoice.client.prename}</Text>
        <Text>{invoice.address}</Text>
        <Text>{invoice.client.phone_number}</Text>
        <Text>{invoice.client.email}</Text>
    </View>
    </div>
      )
  };
  
  export default BillTo