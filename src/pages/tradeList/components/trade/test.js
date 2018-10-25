import {PureComponent} from 'react'
import {Flex,Picker,List} from 'antd-mobile'

const seasons = [
    [
        {
            label: '2013',
            value: '2013',
        },
        {
            label: '2014',
            value: '2014',
        },
    ]
];

export default class extends PureComponent {
    render() {
        console.log(seasons)
        return (
            <div style={{marginTop:'163px'}}>
                <Picker
                    data={seasons}
                    cols={1}
                    title="选择季节"
                    cascade={false}
                    extra="请选择(可选)"
                >
                    <List.Item arrow="horizontal">Multiple</List.Item>
                </Picker>
            </div>

        )
    }
}
