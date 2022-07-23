import React from 'react';
import {Button, Card, DatePicker, Form, Select} from 'antd';
import './index.scss'
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {AiOutlineCheck} from "react-icons/ai"
import {ImCancelCircle} from "react-icons/im"
import {checkRoomStatus, getCallStatus, getData} from "../../store";

const {Option} = Select;

function Index(props) {
    const dispatch = useDispatch()

    const isBusy = useSelector(getData('isBusy'))

    const callStatus1 = useSelector(getCallStatus('isBusy'))
    const callStatus2 = useSelector(getCallStatus('allData'))

    const [form] = Form.useForm();
    const room_number = Form.useWatch('room_number', form);

    const onFinish = (values) => {
        dispatch(checkRoomStatus(
            {
                date: moment(values.date).format("DD-MM-YYYY"),
                room_number: values.room_number,
            }
        ))
    };

    const data = useSelector(getData('allData'))

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const dateFormat = "DD-MM-YYYY"

    return (
        <div className="check">
            <Card title="Check room" className="card">
                <Form
                    name="basic"
                    form={form}
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
                        className="status"
                    >
                        <div className="status">
                            <Button type="primary" htmlType="submit" loading={callStatus1.isLoading}>
                                Check
                            </Button>
                            <div className="">
                                {
                                    (isBusy !== undefined && !!room_number) ?
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
