import {FlatList} from "react-native";
import SearchDropdownCard from "./SearchDropdownCard";

function SearchDropdown({data}){
    return (
        <FlatList data={data} keyExtractor={(event) => event.id} renderItem={(itemData) =>
            <SearchDropdownCard id={itemData.item.id} image={itemData.item.image} title={itemData.item.title}
                       date={`${itemData.item.date.day} ${itemData.item.date.month}`}/>
        }/>
    )
}

export default SearchDropdown;