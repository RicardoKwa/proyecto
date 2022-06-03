<?php
//src/Controller/IndexController.php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Ciudad;
use App\Entity\User;
use App\Entity\Reserva;
use App\Entity\Estancia;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Session\Session;


class AdminController extends AbstractController {

/**
     * @Route("/reservasAdmin", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function getAllReservas(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    
        // $session = $request->getSession();
        // $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $session->get('email')]);
        
        $reservas = $entityManager->getRepository(Reserva::class)->findAll();
        // $queryReservas=$entityManager->createQuery("select e from App\Entity\Reserva e");
        // $reservas = $queryReservas->getResult();
            
        $data = $serializer->serialize($reservas, JsonEncoder::FORMAT);
        return new JsonResponse($data, Response::HTTP_OK, [], true); 
    }



/**
* @Route("/pisosAdmin", methods={"GET"})
* @param Request $request
* @return JsonResponse
* @throws \Exception
*/
public function getAllpisos(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    

    $pisos = $entityManager->getRepository(Estancia::class)->findAll();
    // $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e");
    // $pisos = $queryPisos->getResult();
        
    $data = $serializer->serialize($pisos, JsonEncoder::FORMAT);
    return new JsonResponse($data, Response::HTTP_OK, [], true); 
}

/**
* @Route("/clientesAdmin", methods={"GET"})
* @param Request $request
* @return JsonResponse
* @throws \Exception
*/
public function getAllUser(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    

    $Users = $entityManager->getRepository(User::class)->findAll();
    // $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e");
    // $pisos = $queryPisos->getResult();
    // foreach ($Users as $user) {
    //     // $rol = $user->getRoles();
    //     // if($rol[0] == 'ROLE_ADMIN'){
    //     unset($user);
    //     // }
    // }
        
    $data = $serializer->serialize($Users, JsonEncoder::FORMAT);
    return new JsonResponse($data, Response::HTTP_OK, [], true); 
}




}

