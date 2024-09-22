<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class SupervisorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nombres_completos' => 'required',
            'dni'               =>  ['required', Rule::unique('supervisores')->ignore($this->request->get('id'))],
            'email'             =>  '',
            'telefono'          =>  '',
            'canton_id'         =>  'required',
            'parroquia_id'      =>  'required'
        ];
    }
    public function messages(): array
    {
        return [
            'nombres_completos.required'  => 'El/Los nombre(s) es obligatorio',
            'dni.required'                =>  'El número de cédula es obligatorio',
            'canton_id.required'          =>  'Seleccione un cantón',
            'parroquia_id.required'       =>  'Seleccione una o varias parroquias'
        ];
    }
    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
