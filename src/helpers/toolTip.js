import React from 'react';

function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        return (
            <div style={styles.container}>
                <div style={styles.title}>{label}</div>

                <div style={styles.message}>
                    <span style={styles.messageText}>
                        {payload[0].payload.message}
                    </span>
                </div>

                <div style={styles.stats}>
                    <div style={{ ...styles.stat, ...styles.responded }}>
                        Responded: {payload[0].value}
                    </div>
                    <div style={{ ...styles.stat, ...styles.unresponded }}>
                        Unresponded: {payload[1].value}
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default CustomTooltip;

const styles = {
    container: {
        minWidth: '260px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '14px 16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Roboto',
        borderLeft: '5px solid #ffab99',
    },

    title: {
        fontSize: '15px',
        fontWeight: 600,
        color: '#2C2424',
        marginBottom: '8px',
    },

    message: {
        fontSize: '13px',
        color: '#555',
        marginBottom: '10px',
        lineHeight: 1.4,
    },

    messageLabel: {
        fontWeight: 500,
        marginRight: '4px',
        color: '#333',
    },

    messageText: {
        fontWeight: 400,
    },

    stats: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
    },

    stat: {
        fontSize: '13px',
        fontWeight: 500,
    },

    responded: {
        color: '#7ABB67',
    },

    unresponded: {
        color: '#CA6767',
    },
};
