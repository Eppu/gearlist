import { Input, Loading } from '@nextui-org/react';
import { MagnifyingGlass } from 'phosphor-react';
import debounce from 'lodash.debounce';
import { useState } from 'react';

export default function SearchBar() {
  const [isLoading, setIsLoading] = useState(false);

  const search = async (query: string) => {
    console.log(query);
    if (query.length < 3) {
      return;
    }

    setIsLoading(true);
    const res = await fetch('/api/items/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    console.log(data);
    setIsLoading(false);
  };
  const debouncedSearch = debounce(search, 500);
  return (
    <Input
      clearable
      contentLeft={<MagnifyingGlass size={16} />}
      contentLeftStyling={false}
      size="md"
      // bordered
      css={{
        w: '100%',
        '@xsMax': {
          mw: '100px',
        },
        '& .nextui-input-content--left': {
          h: '100%',
          ml: '$4',
          dflex: 'center',
        },
      }}
      placeholder="Search..."
      aria-label="Search"
      contentRight={isLoading && <Loading size="xs" color="secondary" />}
      onChange={(e) => {
        debouncedSearch(e.target.value);
      }}
    />
  );
}
