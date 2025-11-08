import { useState } from 'react';
import './CheckoutForm.css';

const CheckoutForm = ({ onSubmit, isProcessing }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Email is invalid';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Shipping Information</h2>

      <div className="form-group">
        <label htmlFor="customerName">Full Name *</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          className={errors.customerName ? 'error' : ''}
          placeholder="John Doe"
        />
        {errors.customerName && (
          <span className="error-message">{errors.customerName}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="customerEmail">Email Address *</label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          className={errors.customerEmail ? 'error' : ''}
          placeholder="john@example.com"
        />
        {errors.customerEmail && (
          <span className="error-message">{errors.customerEmail}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="address">Street Address *</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={errors.address ? 'error' : ''}
          placeholder="123 Main St"
        />
        {errors.address && (
          <span className="error-message">{errors.address}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? 'error' : ''}
            placeholder="New York"
          />
          {errors.city && (
            <span className="error-message">{errors.city}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">ZIP Code *</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={errors.zipCode ? 'error' : ''}
            placeholder="10001"
          />
          {errors.zipCode && (
            <span className="error-message">{errors.zipCode}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary submit-btn"
        disabled={isProcessing}
      >
        {isProcessing ? '⏳ Processing...' : '✓ Place Order'}
      </button>
    </form>
  );
};

export default CheckoutForm;