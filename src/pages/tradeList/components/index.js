import List from './list'
import Tabs from './tabs'
import PositonList from './position-list'
import DealList from './deal-list'
import UnDealList from './undeal-list'
import HistoryList from './history-list'
import PingList from './ping-list'
import Header from './header'
import Trade from './trade/'

export default () => (
    <div className="page-main">
        <Header/>
        <Trade/>
        <Tabs>
            <List><PositonList/></List>
            <List><DealList/></List>
            <List><UnDealList/></List>
            <List><HistoryList/></List>
            <List><PingList/></List>
        </Tabs>
    </div>
)
