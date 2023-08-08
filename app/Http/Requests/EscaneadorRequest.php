<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class EscaneadorRequest extends FormRequest
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
            'nombres_completos' =>  'required',
            'dni'               =>  ['required', Rule::unique('escaneadores')->ignore($this->request->get('id'))],
            'telefono'          =>  'required',
            'canton_id'         =>  'required'
        ];
    }
    public function messages(): array
    {
        return [
            'nombres_completos.required'  =>  'El/Los nombre(s) es obligatorio',
            'dni.required'                =>  'El número de cédula es obligatorio',
            'telefono.required'           =>  'El teléfono es requerido',
            'canton_id.required'          =>  'El canton es requerido',
        ];
    }
    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
