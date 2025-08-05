import React, { useState } from "react";
import { ArrowLeft, Save, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../service/fetchApi";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    qty: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const handleBack = () => {
    navigate("/");
  };
  const formatCurrency = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setFormData((prev) => ({
      ...prev,
      price: formatted,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.qty || formData.qty < 0)
      newErrors.qty = "Valid quantity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await addProduct(
        formData.name,
        formData.description,
        formData.price,
        formData.qty
      );
      console.log("Submitted:", formData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ name: "", description: "", price: "", qty: "" });
      }, 2000);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-6 py-12">
        <div className="mb-12">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Add Product
          </h1>
          <p className="text-gray-500">Fill in the product details</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 p-4 bg-green-50 border border-green-100 rounded-lg flex items-center gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
            <span className="text-green-800 text-sm">
              Product added successfully
            </span>
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.name ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                errors.description
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200"
              }`}
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.description}
              </p>
            )}
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (IDR)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  Rp
                </span>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handlePriceChange}
                  className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.price
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                  placeholder="0"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.price}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="qty"
                value={formData.qty}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.qty ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
                placeholder="0"
              />
              {errors.qty && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.qty}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Add Product</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
