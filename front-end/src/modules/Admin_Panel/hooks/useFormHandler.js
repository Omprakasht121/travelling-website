// src/modules/admin_panel/hooks/useFormHandler.js
import { useState, useEffect } from "react";
import { CONTENT_SCHEMA } from "../utils/contentTypes";
import * as adminAPI from "../services/adminAPI";

export default function useFormHandler() {
  const [region, setRegion] = useState("");
  const [contentType, setContentType] = useState("");
  const [fields, setFields] = useState([]); // current field definitions
  const [form, setForm] = useState({}); // values, file objects allowed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!contentType) {
      setFields([]);
      setForm({});
      return;
    }
    const schema = CONTENT_SCHEMA[contentType];
    if (!schema) {
      setFields([]);
      setForm({});
      return;
    }
    setFields(schema.fields);
    // initialize form keys if not present
    setForm((prev) => {
      const next = { ...prev, contentType };
      schema.fields.forEach((f) => {
        if (!(f.name in next)) next[f.name] = f.type === "file" ? null : "";
      });
      return next;
    });
    // eslint-disable-next-line
  }, [contentType]);

  const setFieldValue = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  const submit = async () => {
    setError(null);
    setSuccess(null);
    if (!region) return setError("Please select a region.");
    if (!contentType) return setError("Please select a content type.");
    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("region", region);
      payload.append("contentType", contentType);

      // attach all fields
      fields.forEach((f) => {
        const val = form[f.name];
        if (f.type === "file") {
          if (val) payload.append(f.name, val);
        } else {
          if (val !== undefined) payload.append(f.name, val);
        }
      });

      // Optionally add metadata: createdBy, published etc
      payload.append("published", "true");

      // get JWT token if exists
      const token = localStorage.getItem("token");

      const res = await adminAPI.createContent(payload, token);
      setSuccess("Content created successfully.");
      setForm({});
      setRegion("");
      setContentType("");
      setFields([]);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to create content.");
    } finally {
      setLoading(false);
    }
  };

  return {
    region,
    setRegion,
    contentType,
    setContentType,
    fields,
    form,
    setFieldValue,
    submit,
    loading,
    error,
    success,
  };
}
