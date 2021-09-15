import * as Yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{6,20}$/;
const nameRegex = /^[A-Za-z ]+$/;
const mobileRegex = /^[6-9]\d{9}$/;

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Email address is required.')
    .email('Email address is invalid.'),
  password: Yup.string()
    .required('Password is required.'),
});

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
  .required('First Name is required.'),
  lastName: Yup.string()
  .required('Last Name is required.'),
  email: Yup.string()
  .required('Email is required.'),
  mobileNumber: Yup.string()
  .required('Mobile Number is required.'),
  username: Yup.string()
    .required('Username is required.'),
  password: Yup.string()
    .required('Password is required.'),
});

export const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email address is required.')
    .email('Email address is invalid.'),
});

export const ResetPasswordSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required.'),
  newpassword: Yup.string()
    .matches(passwordRegex, 'Password is invalid.')
    .required('New Password is required.'),
  confirmnewpassword: Yup.string()
    .matches(passwordRegex, 'Password is invalid.')
    .required('Confirm New Password is required.'),
});

export const AdminCategorySchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex, 'Category name can contain only alphabates, dots(.) and spaces.')
    .required('Category name is required.'),
});

export const AdminSubCategorySchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex, 'Sub Category name can contain only alphabates, dots(.) and spaces.')
    .required('Sub Category name is required.'),
});

export const AdminStaffSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex, 'Name can contain only alphabates, dots(.) and spaces.')
    .required('Name is required.'),
  email: Yup.string()
    .required('Email address is required.')
    .email('Email address is invalid.'),
  mobile: Yup.string()
    .required('Mobile number is required.')
    .matches(mobileRegex, 'Mobile number is invalid.'),
});

export const AdminChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Old Password is required.'),
  newPassword: Yup.string()
    .matches(passwordRegex, 'Password is invalid.')
    .required('New Password is required.'),
  confirmPassword: Yup.string()
    .matches(passwordRegex, 'Password is invalid.')
    .required('Confirm New Password is required.'),
});

export const AdminPromoCodeSchema = Yup.object().shape({
  code: Yup.string()
    .required('Code is required.'),
  discountPercentage: Yup.number()
    .typeError('Discount must be a decimal number')
    .min(1, 'More than 1% discount')
    .max(99, 'Less than 100% discount')
    .required('Discount is required.'),
  maxDiscount: Yup.number()
    .integer('Maximum Discount should be a number')
    .required('Maximum Discount is required.'),
  minPurchase: Yup.number()
    .integer('Maximum Discount should be a number')
    .required('Minimum Purchase is required.'),
  description: Yup.string()
    .required('Description is required.'),
});

export const AdminProductsSchema = Yup.object().shape({
         name: Yup.string().required('Name is required.'),
         description: Yup.string().required(
           'Email address is required.',
         ),
         price: Yup.string().required('Mobile number xis required.'),
       });

export const AdminAddCakeProductSchema = Yup.object().shape({
         name: Yup.string().required('Product name is required.'),
         price: Yup.string().required('Price is required.'),
         minWeight: Yup.number()
           .typeError('Weight must be a number')
           .required('Min Weight is required.'),
         maxWeight: Yup.number()
           .typeError('Weight must be a number')
           .required('Max Weight is required.'),
          maxQuantity: Yup.number()
            .typeError('Quantity must be a number')
            .required('Max Quantity is required.'),
         subcategory: Yup.string().required('Sub category is required.'),
         displayPrice: Yup.string().required(
           'Display price is required.',
         ),
       });

export const AdminAddOtherProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required.'),
  price: Yup.string().required('Price is required.'),
  subcategory: Yup.string().required('Subcategory is required.'),
});

export const AdminFlavoursSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex, 'Name can contain only alphabates, dots(.) and spaces.')
    .required('Name is required.'),
    price: Yup.string()
    .required('Price is required.'),
});

export const CustomerSignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Name should contain 4 or more alphabates.')
    .matches(nameRegex, 'Name can contain only alphabates and spaces.')
    .required('Name is required.'),
  password: Yup.string()
    .matches(passwordRegex, 'Password is invalid.')
    .required('New Password is required.'),
  mobile: Yup.string()
    .required('Mobile number is required.')
    .matches(mobileRegex, 'Mobile number is invalid.'),
  email: Yup.string()
    .required('Email address is required.')
    .email('Email address is invalid.'),
});

export const VerifyOtp = Yup.object().shape({
  otp: Yup.string()
    .max(6, 'Invalid Otp, Enter 6 digit otp.')
    .required('Otp is required.'),
  mobile: Yup.string()
    .required('Mobile number is required.')
    .matches(mobileRegex, 'Mobile number is invalid.'),
});

export const CustomOrderSchema = Yup.object().shape({
  occasion: Yup.string().required('Occasion is required.'),
  orderDetails: Yup.string().required(
    'Please decribe your requirements briefly.',
  ),
  pincode: Yup.string().required('pincode is required.'),
  weight: Yup.string().required('weight is required.'),
  quantity: Yup.string().required('quantitiy is required.'),
});

export const AdminCustomOrderEditSchema = Yup.object().shape({
         name: Yup.string().required('Name is required.'),
         occasion: Yup.string().required('Occasion is required.'),
         address: Yup.string().required('address is required.'),
         pincode: Yup.string().required('pincode is required.'),
         expectedDeliveryDate: Yup.string().required(
           'Delivery date is required.',
         ),
       });

export const AddressFormSchema = Yup.object().shape({
         name: Yup.string().required('Name is required.'),
         mobile: Yup.string()
           .required('Mobile number is required.')
           .matches(mobileRegex, 'Mobile number is invalid.'),
         addressLine1: Yup.string().required(
           'Please provide and address for delivery.',
         ),
         areaId: Yup.string().required('Area is required.'),
         deliveryTime: Yup.string().required(
           'Delivery time is required.',
         ),
       });

export const ForgotPasswordSchema = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile number is required.')
    .matches(mobileRegex, 'Mobile number is invalid.'),
});

export const resetPasswordSchema = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile number is required.')
    .matches(mobileRegex, 'Mobile number is invalid.'),
  otp: Yup.string()
    .required('Otp is required.')
    .max(6, 'Invalid Otp, Enter 6 digit otp.'),
  password: Yup.string()
    .required('New Password field is required.')
    .matches(passwordRegex, 'Password is invalid.'),
  confirmPassword: Yup.string()
    .required('Confirm Password field is required.')
    .matches(passwordRegex, 'Password is invalid.')
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same',
      ),
    }),
});
