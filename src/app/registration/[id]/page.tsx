"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Save,
  Phone,
  MapPin,
  FileText,
  User,
  Check,
  ChevronsUpDown,
  ChevronDownIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldTitle,
  } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge";
import { PreRegistration } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
  import { Textarea } from "@/components/ui/textarea";

  import {
    RadioGroup,
    RadioGroupItem,
  } from "@/components/ui/radio-group"

export default function RegistrationDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [preRegistration, setPreRegistration] =
    useState<PreRegistration | null>(null);
  const [formData, setFormData] = useState({
    formNumber: "",
    name: "",
    phone1: "",
    phone2: "",
    branch: "",
    totalGrade: "",
    selectionDept: "",
    location: "",
    dateOfReceipt: "",
    noteOfRecipient: "",
    invoiceId: "",
    dateOfReturn: "",
    noteOfReceiver: "",
    registeredAt: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [openDateReceipt, setOpenDateReceipt] = useState(false);
  const [dateReceipt, setDateReceipt] = useState<Date | undefined>(undefined);

  const [openDateReturn, setOpenDateReturn] = useState(false);
  const [dateReturn, setDateReturn] = useState<Date | undefined>(undefined);
  const [selectedProcess, setSelectedProcess] = useState("receipt");

  const frameworks = [
    {
      value: "دەرمانسازی",
      label: "دەرمانسازی",
    },
    {
      value: "پەرستاری",
      label: "پەرستاری",
    },
    {
      value: "کارگێڕی کار",
      label: "کارگێڕی کار",
    },
    {
      value: "تەکنەلۆجیای تاقیگەی پزیشکی",
      label: "تەکنەلۆجیای تاقیگەی پزیشکی",
    },
    {
      value: "بەڵگەی تاوان",
      label: "بەڵگەی تاوان",
    },
    {
      value: "دیکۆری ناوخۆیی",
      label: "دیکۆری ناوخۆیی",
    },
    {
      value: "کارگێڕی یاسا",
      label: "کارگێڕی یاسا",
    },
    {
      value: "مەوشن گرافیکس",
      label: "مەوشن گرافیکس",
    },
    {
      value: "میکانیکی ئۆتۆمۆبێل",
      label: "میکانیکی ئۆتۆمۆبێل",
    },
    {
      value: "خزمەتگوزاری و تەکنەلۆجیای چاو",
      label: "خزمەتگوزاری و تەکنەلۆجیای چاو",
    },
    {
      value: "وزە نوێبووەکان",
      label: "وزە نوێبووەکان",
    },
    {
      value: "وایەرسازی ئۆتۆمۆبێل",
      label: "وایەرسازی ئۆتۆمۆبێل",
    },
    {
      value: "تەکنەلۆجیای زانیاری (پاڵپشی و چاککردنەوە)",
      label: "تەکنەلۆجیای زانیاری (پاڵپشی و چاککردنەوە)",
    },
    {
      value: "ئینگلیزی (بۆ پەرەپێدانی پیشەیی)",
      label: "ئینگلیزی (بۆ پەرەپێدانی پیشەیی)",
    },
  ];

  const [availableFormNumbers, setAvailableFormNumbers] = useState<number[]>([]);
const [isLoadingFormNumbers, setIsLoadingFormNumbers] = useState(true);

// Add this useEffect to fetch available form numbers
useEffect(() => {
  const fetchAvailableFormNumbers = async () => {
    try {
      setIsLoadingFormNumbers(true);
      const response = await fetch('/api/available-form-numbers');
      if (!response.ok) throw new Error('Failed to fetch form numbers');
      const data = await response.json();
      setAvailableFormNumbers(data.availableNumbers);
    } catch (err) {
      console.error('Error fetching form numbers:', err);
      setError('Failed to load available form numbers');
    } finally {
      setIsLoadingFormNumbers(false);
    }
  };

  fetchAvailableFormNumbers();
}, []);

  useEffect(() => {
    const fetchPreRegistration = async () => {
      try {
        const response = await fetch(`/api/pre-registration/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setPreRegistration(data);
        setFormData((prev) => ({
          ...prev,
          name: data.name,
          phone1: data.phone1,
          phone2: data.phone2 || "",
          branch: data.branch,
          totalGrade: data.totalGrade || "",
          selectionDept: data.selectionDept || "",
          location: data.location || "",
        }));
      } catch (err) {
        setError("Failed to load pre-registration data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreRegistration();
  }, [id]);


  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, data: formData }),
      });

      if (!response.ok) throw new Error("Registration failed");

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !preRegistration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      dir="rtl"
    >
      <div className="container max-w-5xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            گەڕانەوە
          </Button>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-blue-600" />
                  تەواوکردنی تۆمارکردن
                </h1>
                <p className="text-gray-600 mt-2">
                  تکایە زانیاریەکان بە وردی پڕبکەرەوە
                </p>
              </div>
              <Badge variant="outline" className="text-sm">
                ID: {id}
              </Badge>
            </div>
          </div>
        </div>

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              تۆمارکردن بە سەرکەوتوویی تەواو بوو! گەڕانەوە بۆ لاپەڕەی سەرەکی...
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                زانیاری بنەڕەتی
              </CardTitle>
              <CardDescription>زانیاری کەسی و پەیوەندی</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
  <Label
    htmlFor="formNumber"
    className="text-sm font-medium flex items-center gap-2"
  >
    <FileText className="h-4 w-4 text-gray-500" />
    فۆڕمی ژمارە
  </Label>
  <Select
    value={formData.formNumber}
    onValueChange={(value) => 
      setFormData({ ...formData, formNumber: value })
    }
    disabled={isLoadingFormNumbers}
  >
    <SelectTrigger className="h-11">
      <SelectValue 
        placeholder={
          isLoadingFormNumbers 
            ? "چاوەڕوان بە..." 
            : "ژمارەی فۆڕم هەڵبژێرە"
        } 
      />
    </SelectTrigger>
    <SelectContent className="max-h-[300px]">
      {availableFormNumbers.map((num) => (
        <SelectItem key={num} value={num.toString()}>
          {num}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  {availableFormNumbers.length === 0 && !isLoadingFormNumbers && (
    <p className="text-sm text-red-500">
      هیچ ژمارەیەکی بەردەست نییە
    </p>
  )}
</div>

                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <User className="h-4 w-4 text-gray-500" />
                    ناوی چواری فێرخواز
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-11"
                    placeholder="ناوی تەواو"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone1"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4 text-gray-500" />
                    ژ. مۆبایل
                  </Label>
                  <Input
                    id="phone1"
                    name="phone1"
                    type="tel"
                    value={formData.phone1}
                    onChange={handleChange}
                    className="h-11"
                    placeholder="07XX XXX XXXX"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone2"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4 text-gray-500" />
                    ژ. مۆبایل ٢
                  </Label>
                  <Input
                    id="phone2"
                    name="phone2"
                    type="tel"
                    value={formData.phone2}
                    onChange={handleChange}
                    className="h-11"
                    placeholder="07XX XXX XXXX (ئیختیاری)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                زانیاری خوێندن
              </CardTitle>
              <CardDescription>زانیاری لق و بەش</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="branch" className="text-sm font-medium">
                    لق
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue
                        placeholder="لق هەڵبژێرە"
                        onChange={handleChange}
                        id="branch"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="زانستی">زانستی</SelectItem>
                      <SelectItem value="وێژەیی">وێژەیی</SelectItem>
                      <SelectItem value="پیشەیی">پیشەیی</SelectItem>
                      <SelectItem value="پەیمانگە پێنج ساڵییەکان">
                        پەیمانگە پێنج ساڵییەکان
                      </SelectItem>
                      <SelectItem value="ئامادەیی ئیسلامی">
                        ئامادەیی ئیسلامی
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalGrade" className="text-sm font-medium">
                    کۆنمرە
                  </Label>
                  <Input
                    id="totalGrade"
                    name="totalGrade"
                    type="number"
                    step="0.01"
                    value={formData.totalGrade}
                    onChange={handleChange}
                    className="h-11"
                    placeholder="کۆی نمرە"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="selectionDept"
                    className="text-sm font-medium"
                  >
                    بەشی دڵخواز
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {value
                          ? frameworks.find(
                              (framework) => framework.value === value
                            )?.label
                          : "بەشی دڵخوازی فێرخواز هەڵبژێرە"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search framework..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                    const newValue = currentValue === value ? "" : currentValue;
                                    setValue(newValue);
                                    setFormData({ ...formData, selectionDept: newValue }); // <-- add this
                                    setOpen(false);
                                  }}
                                  
                              >
                                {framework.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4 text-gray-500" />
                    ناونیشان
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="h-11"
                    placeholder="ناونیشانی تەواو"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Process */}
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">پڕۆسەی تۆمارکردن</CardTitle>
        <CardDescription>زانیاری وەرگرتن و گەڕاندنەوە</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">

          {/* RadioGroup Field Section */}
          <div className="md:col-span-2">
            <FieldGroup>
              <FieldSet>

                <RadioGroup
                  defaultValue="receipt"
                  onValueChange={setSelectedProcess}
                  className="flex"
                  dir="rtl"
                >
                    {/* Receipt Option */}
                  <FieldLabel htmlFor="receipt-radio" className="cursor-pointer">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>وەرگرتنی فۆرم</FieldTitle>
                        <FieldDescription>
                          لەم بەشەدا فێرخواز دەتوانێت فۆرم وەربگرێت
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="receipt" id="receipt-radio" />
                    </Field>
                  </FieldLabel>

                     {/* Return Option */}
                  <FieldLabel htmlFor="return-radio" className="cursor-pointer">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>گەڕاندنەوەی فۆرم</FieldTitle>
                        <FieldDescription>
                          لەم بەشەدا فێرخواز دەتوانێت فۆرم بگەرێنێتەوە
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="return" id="return-radio" />
                    </Field>
                  </FieldLabel>                 
                </RadioGroup>
              </FieldSet>
            </FieldGroup>
          </div>

          {/* Conditionally Render Based on Selected Process */}
          {selectedProcess === "receipt" ? (
            <>
              {/* Receipt Section */}
              <div className="space-y-2">
                <Label
                  htmlFor="dateOfReceipt"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  ڕێکەوتی وەرگرتن
                </Label>

                <Popover open={openDateReceipt} onOpenChange={setOpenDateReceipt}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      id="dateOfReceipt"
      name="dateOfReceipt"
      className="w-48 justify-between font-normal"
    >
      {dateReceipt ? dateReceipt.toLocaleDateString() : "Select date"}
      <ChevronDownIcon />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
    <Calendar
      mode="single"
      selected={dateReceipt}
      onSelect={(date) => {
        setDateReceipt(date); // <-- update receipt state
        setFormData({
          ...formData,
          dateOfReceipt: date ? date.toISOString().split("T")[0] : "",
        }); // <-- update formData
        setOpenDateReceipt(false); // <-- close the popover
      }}
    />
  </PopoverContent>
</Popover>

              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="noteOfRecipient" className="text-sm font-medium">
                  تێبینی کارمەندی پێدەر
                </Label>
                <Textarea
                  id="noteOfRecipient"
                  name="noteOfRecipient"
                  value={formData.noteOfRecipient}
                  onChange={handleChange}
                  placeholder="تێبینی..."
                  className="min-h-[80px]"
                />
              </div>
            </>
          ) : (
            <>
              {/* Return Section */}
              <div className="space-y-2">
                <Label
                  htmlFor="dateOfReturn"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  ڕێکەوتی گەڕاندنەوە
                </Label>

                <Popover open={openDateReturn} onOpenChange={setOpenDateReturn}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="dateOfReturn"
                      name="dateOfReturn"
                      value={formData.dateOfReturn}
                      className="w-48 justify-between font-normal"
                    >
                      {dateReturn
                        ? dateReturn.toLocaleDateString()
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={dateReturn}
                      onSelect={(date) => {
                        setDateReturn(date)
                        setOpenDateReturn(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceId" className="text-sm font-medium">
                  ژ.وصل
                </Label>
                <Input
                  id="invoiceId"
                  name="invoiceId"
                  value={formData.invoiceId}
                  onChange={handleChange}
                  className="h-11"
                  placeholder="ژمارەی وەسڵ"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="noteOfReceiver" className="text-sm font-medium">
                  تێبینی کارمەندی وەرگر
                </Label>
                <Textarea
                  id="noteOfReceiver"
                  name="noteOfReceiver"
                  value={formData.noteOfReceiver}
                  onChange={handleChange}
                  placeholder="تێبینی..."
                  className="min-h-[80px]"
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
              disabled={isSubmitting}
              className="h-11"
            >
              هەڵوەشاندنەوە
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 h-11 px-8"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  چاوەڕوان بە...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  پشتڕاستکردنەوە
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
