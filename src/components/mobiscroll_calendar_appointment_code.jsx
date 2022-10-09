import React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Page, getJson, setOptions } from '@mobiscroll/react';

setOptions({
    theme: 'windows',
    themeVariant: 'light'
});

function App() {
    const [multiple, setMultiple] = React.useState([
        '2022-10-11T00:00',
        '2022-10-16T00:00',
        '2022-10-17T00:00'
    ]);
    const min = '2022-10-06T00:00';
    const max = '2023-04-06T00:00';
    const [singleLabels, setSingleLabels] = React.useState([]);
    const [singleInvalid, setSingleInvalid] = React.useState([]);
    const [datetimeLabels, setDatetimeLabels] = React.useState([]);
    const [datetimeInvalid, setDatetimeInvalid] = React.useState([]);
    const [multipleLabels, setMultipleLabels] = React.useState([]);
    const [multipleInvalid, setMultipleInvalid] = React.useState([]);

    const onPageLoadingSingle = React.useCallback((event, inst) => {
        getPrices(event.firstDay, (bookings) => {
            setSingleLabels(bookings.labels);
            setSingleInvalid(bookings.invalid);

        });
    }, []);

    const onPageLoadingDatetime = React.useCallback((event, inst) => {
        getDatetimes(event.firstDay, (bookings) => {
            setDatetimeLabels(bookings.labels);
            setDatetimeInvalid(bookings.invalid);
        });
    }, []);

    const onPageLoadingMultiple = React.useCallback((event, inst) => {
        getBookings(event.firstDay, (bookings) => {
            setMultipleLabels(bookings.labels);
            setMultipleInvalid(bookings.invalid);
        });
    }, []);

    const getPrices = (d, callback) => {
        let invalid = [];
        let labels = [];

        getJson('https://trial.mobiscroll.com/getprices/?year=' + d.getFullYear() + '&month=' + d.getMonth(), (bookings) => {
            for (let i = 0; i < bookings.length; ++i) {
                const booking = bookings[i];
                const d = new Date(booking.d);

                if (booking.price > 0) {
                    labels.push({
                        start: d,
                        title: '$' + booking.price,
                        textColor: '#e1528f'
                    });
                } else {
                    invalid.push(d);
                }
            }
            callback({ labels: labels, invalid: invalid });
        }, 'jsonp');
    }

    const getDatetimes = (d, callback) => {
        let invalid = [];
        let labels = [];

        getJson('https://trial.mobiscroll.com/getbookingtime/?year=' + d.getFullYear() + '&month=' + d.getMonth(), (bookings) => {
            for (let i = 0; i < bookings.length; ++i) {
                const booking = bookings[i];
                const bDate = new Date(booking.d);

                if (booking.nr > 0) {
                    labels.push({
                        start: bDate,
                        title: booking.nr + ' SPOTS',
                        textColor: '#e1528f'
                    });
                    invalid = [...invalid, ...booking.invalid];
                } else {
                    invalid.push(d);
                }
            }
            callback({ labels: labels, invalid: invalid });
        }, 'jsonp');
    }

    const getBookings = (d, callback) => {
        let invalid = [];
        let labels = [];

        getJson('https://trial.mobiscroll.com/getbookings/?year=' + d.getFullYear() + '&month=' + d.getMonth(), (bookings) => {
            for (let i = 0; i < bookings.length; ++i) {
                const booking = bookings[i];
                const d = new Date(booking.d);

                if (booking.nr > 0) {
                    labels.push({
                        start: d,
                        title: booking.nr + ' SPOTS',
                        textColor: '#e1528f'
                    });
                } else {
                    invalid.push(d);
                }
            }
            callback({ labels: labels, invalid: invalid });
        }, 'jsonp');
    }

    return (
        <Page className="md-calendar-booking">
            <div className="mbsc-form-group">
                <div className="mbsc-form-group-title">Single date & appointment booking</div>
                <Datepicker
                    display="inline"
                    controls={['calendar']}
                    min={min}
                    max={max}
                    labels={singleLabels}
                    invalid={singleInvalid}
                    pages="auto"
                    onPageLoading={onPageLoadingSingle}
                />
            </div>
            <div className="mbsc-form-group">
                <div className="mbsc-form-group-title">Select date & time</div>
                <Datepicker
                    display="inline"
                    controls={['calendar', 'timegrid']}
                    min={min}
                    max={max}
                    minTime="08:00"
                    maxTime="19:59"
                    stepMinute={60}
                    width={null}
                    labels={datetimeLabels}
                    invalid={datetimeInvalid}
                    onPageLoading={onPageLoadingDatetime}
                    cssClass="booking-datetime"
                />
            </div>
            <div className="mbsc-form-group">
                <div className="mbsc-form-group-title">Booking multiple appointments</div>
                <Datepicker
                    display="inline"
                    controls={['calendar']}
                    value={multiple}
                    min={min}
                    max={max}
                    labels={multipleLabels}
                    invalid={multipleInvalid}
                    pages="auto"
                    selectMultiple={true}
                    onPageLoading={onPageLoadingMultiple}
                />
            </div>
        </Page>
    );
}

export default App;
