import React from 'react';
import {Button, Card, DatePicker, Form, Select} from 'antd';
import './index.scss'
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {AiOutlineCheck} from "react-icons/ai"
import {ImCancelCircle} from "react-icons/im"
import {checkRoomStatus, getCallStatus, getData} from "../../store";

const {Option} = Select;

function Index({values, setValues}) {

    const dispatch = useDispatch()

    const isBusy = useSelector(getData('isBusy'))

    const callStatus1 = useSelector(getCallStatus('isBusy'))
    const callStatus2 = useSelector(getCallStatus('allData'))

    const onFinish = (values) => {
        dispatch(checkRoomStatus(
            {
                date: moment(values.date).format("DD-MM-YYYY"),
                room_number: values.room_number,
            }
        ))
        setValues({
            date: moment(values.date).format("DD-MM-YYYY"),
            room_number: values.room_number,
        })
    };

    const data = useSelector(getData('allData'))

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function disabledDate(current) {
        return current < moment()
    }

    const dateFormat = "DD-MM-YYYY"

    return (
        <div className="check">
            <Card title="Check room" className="card">
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValues={{
                        remember: true,
                        room_number: values.room_number,
                        date: !!values.date ? moment(values.date, dateFormat) : null,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Room"
                        name="room_number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the room number!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select Room"
                            allowClear
                            showSearch
                            loading={callStatus2?.isLoading}
                            value={values.room_number}
                        >
                            {
                                data?.map((i, k) => {
                                    return (
                                        <Option value={i.room_number} key={k}>{i.room_number} - room</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the date!',
                            },
                        ]}
                        preserve
                    >
                        <DatePicker
                            format={dateFormat}
                            disabledDate={disabledDate}
                            value={values.room_number}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 20,
                        }}
                        className="status"
                    >
                        <div className="status">
                            <Button type="primary" htmlType="submit" loading={callStatus1.isLoading}>
                                Check
                            </Button>
                            <div className="">
                                {
                                    (isBusy !== undefined) ?
                                        (
                                            !isBusy ? <AiOutlineCheck className="icon"/> :
                                                <ImCancelCircle className="icon"/>
                                        ) : ""
                                }
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Index;
