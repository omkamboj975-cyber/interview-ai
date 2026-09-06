const FormField = ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-neutral-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-neutral-200 placeholder-neutral-500 outline-none focus:border-pink-500/60 transition-colors duration-200"
    />
  </div>
);

export default FormField;
