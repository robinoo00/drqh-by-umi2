import CSSModules from 'react-css-modules'
import styles from '../styles/form.css'
import {connect} from 'dva'

const Item = ({...rest}) => (
    <div styleName="mod-form">
        <div styleName="td1">{rest.data.title}</div>
        <div styleName="sel-wrap">
            <select styleName="sel" onChange={rest.getCity}>
                {rest.province.map(item => (
                    <option key={'province' + item} value={item}>{item}</option>
                ))}
            </select>
            {rest.city.length != 0 ? <select styleName="sel" onChange={rest.getDistrict}>
                {rest.city.map(item => (
                    <option key={'city' + item} value={item}>{item}</option>
                ))}
            </select> : ''
            }
            {rest.district.length != 0 ? <select styleName="sel" onChange={rest.assignDistrictChoose}>
                {rest.district.map(item => (
                    <option key={'district' + item} value={item}>{item}</option>
                ))}
            </select> : ''
            }
        </div>
    </div>
)

const mapStateToProps = state => ({
    province:state.register.province,
    city:state.register.city,
    district:state.register.district
})

const mapDispatchToProps = dispatch => ({
    getCity: (e) => {
        dispatch({
            type: 'register/getCity',
            name: e.target.value
        })
    },
    getDistrict: (e) => {
        dispatch({
            type:'register/getDistrict',
            name:e.target.value
        })
    },
    assignDistrictChoose:(e) => {
        dispatch({
            type:'register/assignDistrictChoose',
            name:e.target.value
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Item, styles))
