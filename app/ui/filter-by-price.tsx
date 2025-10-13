'use client'

import styles from '@ui/filter.module.css'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


export default function FilterByPrice() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('min', term);
    } else {
      params.delete('min');
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(term);
  }, 300);
    return (
        <div>
            <form action="">
                <div>
                    <label htmlFor="min_price">Min price:</label>
                    <input placeholder='Filter by price' className={styles.filterInput} type="number" id="min_price" name="min_price" onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('min')?.toString()} />
                </div>
                {/* <div>
                    <label htmlFor="max_price">Max:</label>
                    <input className={styles.filterInput} type="number" id="max_price" name="max_price" />
                </div>
                <button className={styles.filterButton} type="submit" >Apply filter</button> */}
            </form>
        </div>
    )
}