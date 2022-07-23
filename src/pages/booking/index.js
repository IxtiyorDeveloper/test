import React, {useEffect} from 'react';
import {Button, Card, DatePicker, Form, Input, message, Select} from 'antd';
import './index.scss'
import {useDispatch, useSelector} from "react-redux";
import {attachDateToRoom, getCallStatus, getData} from "../../store";
import moment from "moment";

const {Option} = Select;

function Index(props) {

    const dispatch = useDispatch()

    const callStatus1 = useSelector(getCallStatus('rooms'))
    const callStatus2 = useSelector(getCallStatus('allData'))

    const onFinish = ({date, room_number}) => {
        dispatch(attachDateToRoom({date: moment(date).format("DD-MM-YYYY"), room_number}))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const data = useSelector(getData('allData'))

    useEffect(() => {
        if (callStatus1.isError || callStatus2.isError) message.error("Error!!!")
    }, [callStatus1.isError,callStatus2.isError])

    const dateFormat = "DD-MM-YYYY"

    return (
        <div className="add">
            <Card title="Add booking" className="card">
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
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Surname"
                        name="surname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your surname!',
                            },
                        ]}
                    >
                        <Input placeholder="Surname"/>
                    </Form.Item>
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
                    >
                        <DatePicker
                            format={dateFormat}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 20,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={callStatus1.isLoading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Index;
