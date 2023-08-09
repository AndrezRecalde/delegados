<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class VeedorRequest extends FormRequest
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
            'dni'               =>  'required',
            'telefono'          =>  'required',
            'coordinador_id'    =>  'required',
            'canton_id'         =>  'required',
            'recinto_id'        =>  'required',
            'junta_id'          =>  ''
        ];
    }

    public function messages(): array
    {
        return [
            'nombres_completos.required'  =>  'El/Los nombre(s) es obligatorio',
            'dni.required'                =>  'El número de cédula es obligatorio',
            'telefono.required'           =>  'El teléfono es requerido',
            'coordinador_id.required'     =>  'El supervisor es requerido',
            'canton_id.required'          =>  'El canton es requerido',
            'recinto_id.required'         =>  'El recinto es requerida'
        ];
    }
    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
