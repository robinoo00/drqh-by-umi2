import Header from '../../../components/header/header'
import Nav from './nav'
import Otc from './otc'

const Charge = () => (
    <div>
        <Header
            title={<Nav/>}
        />
        <Otc/>
    </div>
)

export default Charge
