import React, { useContext } from 'react'
import myContext from '../../context/context'

export default function Filter(props) {

    const context = useContext(myContext)
    const { mode, product , searchkey, filterType, filterPrice, setSearchkey, setFilterPrice, setFilterType , setProduct} = context

    const callMe = () => {
        setFilterPrice("")
        setSearchkey("")
        setFilterType("")
        // setProduct()
    }

    let categoryItem = []
    let priceItem = []
    
    return (
           <div  className=' container mx-auto px-4 mt-5 '>
                <div className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200"
                    style={{
                        backgroundColor: mode === 'dark' ? '#282c34' : '',
                        color: mode === 'dark' ? 'white' : '',
                    }}>
                    <div className="flex items-center justify-between ">
                        <p className="font-medium">
                            Filters
                        </p>
                        <button onClick={() => callMe()} className="px-4 py-2 bg-gray-50hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md" style={{ color: mode === 'dark' ? 'white' : '' }}>
                            Reset Filter
                        </button>
                    </div>
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                {product.map((item) => {
                                    const {category} = item
                                    
                                    if (!categoryItem.includes(category)) {
                                        categoryItem.push(category)
                                    }
                                 
                                })}
                                {categoryItem.map((el, index) => {
                                       return(
                                        <option key={index} value={el}>{el}</option>   
                                    )
                                })}
                            </select>
                            <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)} className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0  focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', }}>
                            {product.map((item ) => {
                                    const {price} = item
                                    if (!priceItem.includes(price)) {
                                        priceItem.push(price)
                                    }
                                })}
                                {
                                    priceItem.map((item, index) => {
                                        return(
                                            <option key={index} value={item}>{item}</option>
                                            
                                        )
                                    })
                                }
                            </select>

                        </div>
                    </div>
                </div>
            </div>

    )
}
