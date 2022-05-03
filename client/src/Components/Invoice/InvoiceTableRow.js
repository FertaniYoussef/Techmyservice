import { Fragment,useEffect } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        flexGrow: 1,
        textAlign: 'center',

    },
    description: {
        width: '80%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },

    rate: {
        width: '26%',

    },

});


const InvoiceTableRow = ({ items }) => {
    return (
    <div> 
         <View style={styles.row}>
        <Text style={styles.description}>{items.package.name}</Text>
        <Text style={styles.rate}>{ Number.parseFloat(items.package.price).toFixed(2)}</Text>
    </View>
    
        {items.addon.length>0 && items.addon.map(item =>
        <div>
            <View style={styles.row} >
                <Text style={styles.description}>{item.name}</Text>
                <Text style={styles.rate}>{ Number.parseFloat(item.supplement).toFixed(2)}</Text>
            </View></div>
        )}</div>)
};

export default InvoiceTableRow