import { useState, useEffect, useRef, JSX } from 'react';
import { TProps } from './type';
import styles from './style.module.css';
import { ArrowDownIcon } from './arrow-down-icon';
import { CloseIcon } from './close-icon';

export const SelectFieldSimple = ({
  options = [],
  value = '',
  onChange,
  rtl = true,
  placeholder = 'Select',
  label = '',
  searchPlaceholder = 'Search',
  noOptions = 'No Options',
  icon,
}: TProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter(option =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, options]);

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

  const clearSelection = () => onChange('');

  /* Start render */
  const optionsList =
    filteredOptions?.length > 0 ? (
      filteredOptions.map(option => (
        <li
          key={option.value}
          className={`${styles.option} ${
            value === option.value ? styles.selected : ''
          }`}
          onClick={() => {
            onChange(option.value);
            setIsOpen(false);
          }}
        >
          {option.label}
        </li>
      ))
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

          {value ? (
            <span>{options.find(opt => opt.value === value)?.label}</span>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>

        <div className='flex items-center justify-end'>
          {value && (
            <button
              title='Clear Selection'
              onClick={e => {
                e.stopPropagation();
                clearSelection();
              }}
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
