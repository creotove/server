import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

const Category = () => {
  const [categoryName, setCategoryName] = useState();
  const [catogories, setCategories] = useState();
  const [description, setDescription] = useState();
  const location = useLocation();

  const publisherId = location.pathname.split("/")[2];
  const getMyCategories = async () => {
    try {
      const res = await axios.get(`/publisher/get-categories/${publisherId}`);
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateCategory = async () => {
    try {
      const data = {
        name: categoryName,
        description,
        createdBy: publisherId,
      };
      const res = await axios.post("/publisher/create-category", data);
      if (res.data.success) {
        getMyCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyCategories();
  }, []);

  return (
    <section className="mt-3">
      <div className="row col-12">
        <h2>Add new Categories</h2>
        <div>
          <label>Name</label>
          <input
            className="col-6 bg-transparent outline-0 border-b-2 border-white"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-3 col-8">
          <label>description</label>
          <textarea
            className="col-12 bg-transparent outline-0 border rounded border-white"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="mt-3 btn-primary btn"
              onClick={handleCreateCategory}
            >
              create
            </button>
          </div>
        </div>
      </div>
      <div className="row col-12">
        <div className="col-12 col-md-6">
          <h2>Categories</h2>
          <div className="table-responsive">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th className="px-3" scope="col">#</th>
                  <th className="px-3" scope="col">Name</th>
                  <th className="px-3" scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {catogories && catogories.length > 0 ? (
                  catogories.map((category, idx) => (
                    <tr>
                      <td>{idx + 1}</td>
                      <td>{category?.name}</td>
                      <td className="text-wrap truncate">{category?.description?.length > 40 ? category?.description?.slice(0,40) + '...' : category?.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No categories found</td>
                  </tr>
                )}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
