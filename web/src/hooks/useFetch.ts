import React, { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (uri: string) => {
    const [data, setData] = useState<any>();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!uri) return;
        axios
            .get(uri)
            .then((res) => setData(res.data))
            .then(() => setLoading(false))
            .catch(setError);
    }, [uri]);
    return {
        loading,
        data,
        error,
    };
};

export { useFetch };
