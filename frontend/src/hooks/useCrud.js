"use client";

import { useCallback, useEffect, useState } from "react";
import api, { errorMessage } from "@/lib/axios";

// Ek endpoint ka poora CRUD state ek jagah
export default function useCrud(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(endpoint);
      setItems(res.data.data || []);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (payload) => {
      await api.post(endpoint, payload);
      await load();
    },
    [endpoint, load]
  );

  const update = useCallback(
    async (id, payload) => {
      await api.put(`${endpoint}/${id}`, payload);
      await load();
    },
    [endpoint, load]
  );

  const remove = useCallback(
    async (id) => {
      await api.delete(`${endpoint}/${id}`);
      await load();
    },
    [endpoint, load]
  );

  return { items, loading, error, reload: load, create, update, remove };
}
