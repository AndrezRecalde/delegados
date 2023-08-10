<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class CoordinadorRequest extends FormRequest
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
            'dni'               =>  ['required', Rule::unique('coordinadores')->ignore($this->request->get('id'))],
            'email'             =>  '',
            'telefono'          =>  'required',
            'supervisor_id'     =>  'required',
            'canton_id'         =>  'required',
            'parroquia_id'      =>  'required',
            'recinto_id'        =>  'required'
        ];
    }
    public function messages(): array
    {
        return [
            'nombres_completos.required'  =>  'El/Los nombre(s) es obligatorio',
            'dni.required'                =>  'El número de cédula es obligatorio',
            'dni.unique'                  =>  'El número de cédula ya esta ingresado',
            'telefono.required'           =>  'El teléfono es requerido',
            'supervisor_id.required'      =>  'El supervisor es requerido',
            'canton_id.required'          =>  'El canton es requerido',
            'parroquia_id.required'       =>  'La parroquia es requerida',
            'recinto_id.required'         =>  'Seleccione uno o varios recintos'
        ];
    }
    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
