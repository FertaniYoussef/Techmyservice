import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '78%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },

    rate: {
        width: '26%',
    },

  });

  const InvoiceTableHeader = () => {
    return (<View style={styles.container}>
        <Text style={styles.description}>Item Name</Text>
        <Text style={styles.rate}>Price</Text>
    </View>)
  };
  
  export default InvoiceTableHeader