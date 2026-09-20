export interface PreRegistration {
  id: string;
  name: string; 
  branch: string; 
  phone1: string; 
  phone2?: string; 
  location?: string;
  preferredDepartments?: string; 
  [key: string]: string | undefined;
}

export interface Registration extends PreRegistration {
  formNumber: string; // فۆڕمی ژمارە
  totalGrade?: string; // کۆنمرە %
  selectionDept?: string; // بەشی دڵخواز
  location?: string; // ناونیشان
  dateOfReceipt?: string; // ڕێکەوتی وەرگرتن
  noteOfRecipient?: string; // تێبینی کارمەندی پێدەر
  invoiceId?: string; // ژ.وصل
  dateOfReturn?: string; // ڕێکەوتی گەڕاندنەوە
  noteOfReceiver?: string; // تێبینی کارمەندی وەرگر
  registeredAt: string; // auto-generated timestamp of registration
}
