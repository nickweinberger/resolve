import * as React from 'react';
import { Searchbar } from 'react-native-paper';


const ContactsSearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Add Contact"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default ContactsSearchBar;
