import { useState, useEffect, useRef, JSX } from 'react';
import { TProps } from './type';
import styles from './style.module.css';
import { ArrowDownIcon } from './arrow-down-icon';
import { CloseIcon } from './close-icon';

/**
SelectFieldMulti component allows users to select multiple options from a dropdown list.

@component
@example
import { useState } from 'react';
import { SelectFieldMulti } from './SelectFieldMulti';

const MyComponent = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  return (
    <SelectFieldMulti
      values={selectedValues}
      onChange={setSelectedValues}
      options={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' }
      ]}
      placeholder="Select options..."
      searchPlaceholder="Search..."
      allOptionsSelected="All Options Selected"
      selectAll="Select All"
      noOptions="No Options Available"
      rtl={false}
    />
  );
};

export default MyComponent;

 * @param {Object} props - Component properties.
 * @param {{ label: string, value: string }[]} [props.options] - List of options available for selection.
 * @param {string[]} [props.values=[]] - Array of selected values.
 * @param {Function} props.onChange - Callback function to handle selection changes.
 * @param {string} [props.placeholder='Select'] - Placeholder text when no selection is made.
 * @param {string} [props.searchPlaceholder='Search'] - Placeholder text for the search input field.
 * @param {string} [props.allOptionsSelected='All Options Selected'] - Text displayed when all options are selected.
 * @param {string} [props.selectAll='Select All'] - Label for the "Select All" option.
 * @param {string} [props.noOptions='No Options'] - Message shown when no options match the search query.
 * @param {boolean} [props.rtl=true] - Whether the dropdown should be displayed in RTL mode.
 * @param {JSX.Element} [props.icon] - Optional icon to display at the start of the select field.
 * @returns {JSX.Element} The SelectFieldMulti dropdown component.
 */

export const SelectFieldMulti = ({
  options = [],
  values = [],
  onChange,
  rtl = true,
  placeholder = 'Select',
  label = '',
  searchPlaceholder = 'Search',
  allOptionsSelected = 'All Options Selected',
  selectAll = 'Select All',
  noOptions = 'No Options',
  icon,
}: TProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => {
      setFilteredOptions(
        options?.filter(option =>
          option.label.toLowerCase().includes(search.toLowerCase())
        )
      );
    },
    [
      /*search, options*/
    ]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: { value: string }) => {
    if (values?.includes(option.value)) {
      onChange(values?.filter(val => val !== option.value));
    } else {
      onChange([...values, option.value]);
    }
  };

  const clearSelection = () => {
    onChange([]);
  };

  const selectAllOptions = () => {
    if (values.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map(option => option.value));
    }
  };

  /* Start render */
  const selectedValuesList = values?.map(val => (
    <span
      key={val}
      className={styles.optionTag}
    >
      <span>{options.find(opt => opt.value === val)?.label}</span>

      <button
        onClick={e => {
          e.stopPropagation();
          toggleOption({ value: val });
        }}
      >
        <CloseIcon color='white' />
      </button>
    </span>
  ));

  const optionsList =
    filteredOptions?.length > 0 ? (
      <>
        <li
          className={`${styles.option} ${
            values.length === options.length ? styles.selected : ''
          }`}
          onClick={selectAllOptions}
        >
          {selectAll}
        </li>

        {filteredOptions.map(option => (
          <li
            key={option.value}
            className={`${styles.option} ${
              values?.includes(option.value) ? styles.selected : ''
            }`}
            onClick={() => toggleOption(option)}
          >
            {option.label}
          </li>
        ))}
      </>
    ) : (
      <li className={styles.noOptions}>{noOptions}</li>
    );
  /* End render */

  return (
    <div
      className={styles.container}
      dir={rtl ? 'rtl' : 'ltr'}
      ref={containerRef}
    >
      <div
        className={styles.control}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span>{icon}</span>

        <div className={styles.selectedOptions}>
          {label && (
            <label className='text-dark-100 whitespace-nowrap text-md'>
              {label}
            </label>
          )}

          {selectedValuesList?.length === options?.length &&
          options?.length > 0 ? (
            <span>{allOptionsSelected}</span>
          ) : selectedValuesList?.length > 0 ? (
            <div className='flex flex-wrap gap-2'>{selectedValuesList}</div>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>

        <div>
          {selectedValuesList?.length > 0 && (
            <button
              title='Clear All Selections'
              onClick={clearSelection}
              className={styles.clearBtn}
            >
              <CloseIcon />
            </button>
          )}

          <button className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>
            <ArrowDownIcon />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <input
            type='text'
            className={styles.searchInput}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
          />

          <ul className={styles.optionsList}>{optionsList}</ul>
        </div>
      )}
    </div>
  );
};
