import {useState} from 'react'
import {RECIPES_PER_PAGE} from '../constants/constants'


const usePagination=()=>{
    const [state, setState]=useState<number>(RECIPES_PER_PAGE)
    const showMoreRecipes = ()=>{
        setState((prevState)=>(prevState+RECIPES_PER_PAGE))
    }

    return [state, showMoreRecipes] as const
}

export default usePagination
