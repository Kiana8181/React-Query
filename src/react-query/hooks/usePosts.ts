import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

  interface PostQuery{
    // page:number
    pageSize:number
    userId:number | undefined
  }

const usePosts = (query:PostQuery) => {
    const fetchPosts = ({pageParam=1}:any) =>
        axios
        .get('https://jsonplaceholder.typicode.com/posts',{params:{
            _start:(pageParam-1)*query.pageSize,
            _limit:query.pageSize,
            userId:query.userId ? query.userId : null
        }})
        .then((res) => res.data)

    return useInfiniteQuery<Post[], Error>({
        queryKey:['posts',query],
        queryFn: fetchPosts,
        staleTime:10*60*1000,
        keepPreviousData:true,
        getNextPageParam:(lastPage,allPage)=>{
            return lastPage.length>0 ? allPage.length+1 : undefined
        }
        
      })
}

export default usePosts