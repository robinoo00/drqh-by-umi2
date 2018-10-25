import Item from './item'

const List = ({...rest}) => (
    <div>
        {rest.list.map(item => (
            <Item key={item.ID} item={item}/>
        ))}
    </div>
)

export default List
