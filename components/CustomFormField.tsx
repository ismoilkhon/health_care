'use client'

import Image from 'next/image'
import { Control } from 'react-hook-form'
import 'react-phone-number-input/style.css'
import { Input } from '@/components/ui/input'
import PhoneInput from 'react-phone-number-input'
import { FormFildType } from './forms/PatientForm'
import { E164Number } from 'libphonenumber-js/core'
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form'


interface CustomProps  {
    name: string
    label?: string
    iconSrc?: string
    iconAlt?: string
    disabled?: boolean
    dataFormat?: string
    placeholder?: string
    control: Control<any>
    fieldTyle: FormFildType
    showTimeSelect?: boolean
    children?: React.ReactNode
    renredSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({field, props}: {field: any; props: CustomProps}) => {
    const { iconAlt, iconSrc, fieldTyle, placeholder, } = props
  switch (fieldTyle) {
    case FormFildType.INPUT: 
        return(
            <div className='flex rounded-md border border-dark-500 bg-dark-400 '>
                {iconSrc && (
                    <Image 
                        src={iconSrc}
                        width={24}
                        height={24}
                        className='ml-2'
                        alt={iconAlt || 'icon'}
                    />
                )}
                <FormControl>
                    <Input 
                        placeholder={props.placeholder}
                        {...field}
                        className='shad-input border-0'
                    />
                </FormControl>
            </div>
        )
    case FormFildType.PHONE_INPUT:
        return(
            <FormControl>
                <PhoneInput 
                    international
                    defaultCountry='UZ'
                    className='input-phone'
                    withCountryCallingCode
                    placeholder={placeholder}
                    onChange={field.onChange}
                    value={field.value as E164Number | undefined}
                />
            </FormControl>
        )
  }
    
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldTyle, label, name } = props
    return ( 
        <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem className='flex-1'>
            {fieldTyle !== FormFildType.CHECKBOX && label &&  (
                <FormLabel>{label}</FormLabel>
            )} 
            <RenderField field={field} props={props} />
            <FormMessage className='shad-error ' />
          </FormItem>
        )}
      />  
    )
}

export default CustomFormField