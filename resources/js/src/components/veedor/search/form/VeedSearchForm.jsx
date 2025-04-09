import { useEffect, useMemo } from "react";
import { Box, Grid, Select } from "@mantine/core";
import { IconDatabase } from "@tabler/icons-react";
import { BtnSubmit } from "../../../../components";
import {
    useCoordinadorStore,
    useStateStore,
    useSupervisorStore,
    useVeedorStore,
} from "../../../../hooks";
import { ROLES } from "../../../../helpers/getDictionary";

export const VeedSearchForm = ({ form }) => {
    const {
        canton_id,
        parroquia_id,
        recinto_id,
        supervisor_id,
        coordinador_id,
    } = form.values;
    const usuario = useMemo(
        () => JSON.parse(localStorage.getItem("service_user")),
        []
    );
    const { startSearchVeedor } = useVeedorStore();
    const {
        supervisores,
        activateSupervisor,
        startLoadSupervisores,
        startClearSupervisores,
    } = useSupervisorStore();
    const {
        coordinadores,
        activateCoordinador,
        startLoadCoordinadores,
        startLoadCoordsForCanton,
        startClearCoordinadores,
    } = useCoordinadorStore();
    const {
        cantones,
        parroquias,
        recintos,
        startLoadCantones,
        startLoadParroquias,
        startLoadRecintos,
        starClearStates,
    } = useStateStore();

    // Cargar datos iniciales

    useEffect(() => {
        if (usuario.role === ROLES.ADMIN) {
            startLoadCantones();
            startLoadSupervisores({});
            startLoadCoordinadores();
        }

        return () => {
            starClearStates();
            startClearCoordinadores();
            startClearSupervisores();
        };
    }, []);

    useEffect(() => {
        if (
            usuario.role === ROLES.SUPERVISOR &&
            activateSupervisor &&
            activateSupervisor.canton_id
        ) {
            startLoadCantones(activateSupervisor.canton_id);
            startLoadCoordsForCanton({
                canton_id: activateSupervisor.canton_id,
            });
            return;
        }
    }, [activateSupervisor]);

    useEffect(() => {
        if (
            usuario.role === ROLES.COORDINADOR &&
            activateCoordinador &&
            activateCoordinador.canton_id
        ) {
            startLoadCantones(activateCoordinador.canton_id);
            startLoadCoordsForCanton({
                canton_id: activateCoordinador.canton_id,
            });
            return;
        }
    }, [activateCoordinador]);

    // Cargar parroquias cuando cambia el cantón
    useEffect(() => {
        //console.log(canton_id);
        startLoadParroquias(canton_id);
        form.setFieldValue("parroquia_id", null);
    }, [canton_id]);

    // Cargar recintos cuando cambia la parroquia
    useEffect(() => {
        startLoadRecintos(parroquia_id);
        form.setFieldValue("recinto_id", null);
    }, [parroquia_id]);

    // Manejar el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        if (usuario.role === ROLES.COORDINADOR) {
            if (
                !canton_id &&
                !parroquia_id &&
                !recinto_id &&
                !supervisor_id &&
                !coordinador_id
            ) {
                startSearchVeedor({ canton_id: activateCoordinador.canton_id });
                //console.log("aqui llega 1 ");
                return;
            }
            if (
                !canton_id &&
                !parroquia_id &&
                !recinto_id &&
                !supervisor_id &&
                coordinador_id
            ) {
                startSearchVeedor({ coordinador_id: coordinador_id });
                //console.log("aqui llega 1 ");
                return;
            }
        }
        if (usuario.role === ROLES.SUPERVISOR) {
            if (
                !canton_id &&
                !parroquia_id &&
                !recinto_id &&
                !supervisor_id &&
                !coordinador_id
            ) {
                startSearchVeedor({ canton_id: activateSupervisor.canton_id });
                //console.log("aqui llega 1 ");
                return;
            }
        }
        //console.log("aqui llega 2");
        //console.log(form.getTransformedValues());
        startSearchVeedor(form.getTransformedValues());
    };

    // Memorizamos los datos mapeados de cantones, parroquias, recintos, supervisores y coordinadores
    const cantonesOptions = useMemo(
        () =>
            cantones.map((canton) => ({
                value: canton.id,
                label: canton.nombre_canton,
            })),
        [cantones]
    );

    const parroquiasOptions = useMemo(
        () =>
            parroquias.map((parroquia) => ({
                value: parroquia.id.toString(),
                label: parroquia.nombre_parroquia,
            })),
        [parroquias]
    );

    const recintosOptions = useMemo(
        () =>
            recintos.map((recinto) => ({
                value: recinto.id.toString(),
                label: recinto.nombre_recinto,
            })),
        [recintos]
    );

    const supervisoresOptions = useMemo(
        () =>
            supervisores.map((supervisor) => ({
                value: supervisor.id.toString(),
                label:
                    supervisor.nombres_supervisor +
                    " " +
                    supervisor.apellidos_supervisor,
            })),
        [supervisores]
    );

    const coordinadoresOptions = useMemo(
        () =>
            coordinadores.map((coordinador) => ({
                value: coordinador.id.toString(),
                label:
                    coordinador.nombres_coordinador +
                    " " +
                    coordinador.apellidos_coordinador,
            })),
        [coordinadores]
    );

    return (
        <Box
            component="form"
            mx="auto"
            sx={(theme) => ({
                padding: theme.spacing.md,
            })}
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Grid>
                {usuario.role === ROLES.ADMIN && (
                    <>
                        <Grid.Col sm={12} md={4}>
                            <Select
                                label="Selecciona el Cantón"
                                placeholder="Cantón"
                                searchable
                                clearable
                                nothingFound="No options"
                                {...form.getInputProps("canton_id")}
                                data={cantonesOptions}
                            />
                        </Grid.Col>
                        <Grid.Col sm={12} md={4}>
                            <Select
                                label="Selecciona la Parroquia"
                                placeholder="Parroquia"
                                searchable
                                clearable
                                nothingFound="No options"
                                {...form.getInputProps("parroquia_id")}
                                data={parroquiasOptions}
                            />
                        </Grid.Col>
                        <Grid.Col sm={12} md={4}>
                            <Select
                                label="Selecciona el Recinto"
                                placeholder="Recinto"
                                searchable
                                clearable
                                nothingFound="No options"
                                {...form.getInputProps("recinto_id")}
                                data={recintosOptions}
                            />
                        </Grid.Col>
                    </>
                )}
                {usuario.role === ROLES.ADMIN && (
                    <>
                        <Grid.Col sm={12} md={6}>
                            <Select
                                label="Selecciona el Supervisor"
                                placeholder="Supervisor"
                                searchable
                                clearable
                                nothingFound="No options"
                                {...form.getInputProps("supervisor_id")}
                                data={supervisoresOptions}
                            />
                        </Grid.Col>
                        <Grid.Col sm={12} md={6}>
                            <Select
                                label="Selecciona el Coordinador"
                                placeholder="Coordinador"
                                searchable
                                clearable
                                nothingFound="No options"
                                {...form.getInputProps("coordinador_id")}
                                data={coordinadoresOptions}
                            />
                        </Grid.Col>
                    </>
                )}
                {usuario.role === ROLES.SUPERVISOR && (
                    <Grid.Col sm={12} md={12}>
                        <Select
                            label="Selecciona el Coordinador"
                            placeholder="Coordinador"
                            searchable
                            clearable
                            nothingFound="No options"
                            {...form.getInputProps("coordinador_id")}
                            data={coordinadoresOptions}
                        />
                    </Grid.Col>
                )}
                {usuario.role === ROLES.COORDINADOR && (
                    <Grid.Col sm={12} md={12}>
                        <Select
                            label="Selecciona el Coordinador"
                            placeholder="Coordinador"
                            searchable
                            clearable
                            nothingFound="No options"
                            {...form.getInputProps("coordinador_id")}
                            data={coordinadoresOptions}
                        />
                    </Grid.Col>
                )}
            </Grid>
            <BtnSubmit IconSection={IconDatabase}>Filtrar Delegados</BtnSubmit>
        </Box>
    );
};
