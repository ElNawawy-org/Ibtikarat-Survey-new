import { TProps } from './type';
import { SearchIcon } from './search-icon';

export const SearchField = ({ placeholder, value, onChange }: TProps) => {
  return (
    <label className='pr-2 flex gap-2 justify-between items-center bg-secondary-100 border border-grey-400'>
      <SearchIcon />

      <input
        type='search'
        placeholder={placeholder}
        className='basis-full p-2 outline-hidden border-none focus:outline-hidden focus:border-none focus:ring-0'
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
